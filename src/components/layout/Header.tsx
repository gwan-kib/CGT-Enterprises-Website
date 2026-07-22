import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

import { business } from "../../data/business";
import { navigationItems } from "../../data/navigation";
import { Button } from "../ui/Button";

type NavigationHref = (typeof navigationItems)[number]["href"];

interface NavigationLinksProps {
  activeHref: NavigationHref | null;
  highlightedHref: NavigationHref | null;
  onHoverChange: (href: NavigationHref | null) => void;
}

function NavigationLinks({ activeHref, highlightedHref, onHoverChange }: NavigationLinksProps) {
  return (
    <ul className="site-nav__list">
      {navigationItems.map((item) => {
        const isActive = activeHref === item.href;
        const isHighlighted = highlightedHref === item.href;

        return (
          <li key={item.href}>
            <a
              aria-current={isActive ? "location" : undefined}
              className={`site-nav__link${isHighlighted ? " site-nav__link--highlighted" : ""}`}
              href={item.href}
              onMouseEnter={() => onHoverChange(item.href)}
              onMouseLeave={() => onHoverChange(null)}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function handleSectionLinkClick(event: MouseEvent<HTMLElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const clickedElement = event.target;

  if (!(clickedElement instanceof Element)) {
    return;
  }

  const link = clickedElement.closest<HTMLAnchorElement>('a[href^="#"]');

  if (!link || !event.currentTarget.contains(link)) {
    return;
  }

  const sectionId = link.hash.slice(1);
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  event.preventDefault();
  section.scrollIntoView({ behavior: "smooth", block: "center" });

  if (window.location.hash !== link.hash) {
    window.history.pushState(null, "", link.hash);
  }
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navTrackRef = useRef<HTMLDivElement>(null);
  const navIndicatorRef = useRef<HTMLSpanElement>(null);
  const [activeHref, setActiveHref] = useState<NavigationHref | null>(null);
  const [hoveredHref, setHoveredHref] = useState<NavigationHref | null>(null);
  const highlightedHref = hoveredHref ?? activeHref;

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    // Distance, in pixels, over which the shell completes its transformation.
    const scrollRange = 120;
    // Time-based easing strength. Higher values settle faster.
    const smoothingRate = 14;
    // Final top and bottom gap around the floating shell.
    const maximumBlockInset = 0;
    // Final horizontal space between the shell edge and the header content.
    const maximumContentPadding = 24;
    // Final corner radius of the fully transformed shell.
    const maximumRadius = 50;
    // Final downward offset of the floating shell.
    const maximumTranslateY = 20;

    let maximumInlineInset = 8;
    let targetProgress = Math.min(window.scrollY / scrollRange, 1);
    let currentProgress = targetProgress;
    let animationFrame = 0;
    let previousFrameTime = 0;

    const measureMaximumInlineInset = () => {
      const headerContent = header.querySelector<HTMLElement>(".site-header__top");

      if (headerContent) {
        maximumInlineInset = Math.max(8, headerContent.getBoundingClientRect().left - maximumContentPadding);
      }
    };

    const applyProgress = (progress: number) => {
      header.style.setProperty("--header-shell-inset-block", (maximumBlockInset * progress).toFixed(2) + "px");
      header.style.setProperty("--header-shell-inset-inline", (maximumInlineInset * progress).toFixed(2) + "px");
      header.style.setProperty("--header-shell-radius", (maximumRadius * progress).toFixed(2) + "px");
      header.style.setProperty("--header-shell-translate-y", (maximumTranslateY * progress).toFixed(2) + "px");
      header.style.setProperty("--header-shell-outline-strength", (progress * 100).toFixed(1) + "%");
      header.style.setProperty("--header-shell-divider-strength", ((1 - progress) * 100).toFixed(1) + "%");
      header.style.setProperty(
        "--header-shell-shadow-y",
        // Final vertical shadow offset. Change 8 to adjust the shadow depth.
        (8 * progress).toFixed(2) + "px",
      );
      header.style.setProperty(
        "--header-shell-shadow-blur",
        // Final shadow blur. Change 24 to make the shadow sharper or softer.
        (24 * progress).toFixed(2) + "px",
      );
      header.style.setProperty(
        "--header-shell-shadow-alpha",
        // Final shadow opacity. Keep this value between 0 and 1.
        (0.08 * progress).toFixed(3),
      );
    };

    const animateToScrollPosition = (timestamp: number) => {
      animationFrame = 0;

      const elapsedSeconds = Math.min(Math.max((timestamp - previousFrameTime) / 1000, 0), 0.1);
      const smoothingFactor = 1 - Math.exp(-smoothingRate * elapsedSeconds);

      currentProgress += (targetProgress - currentProgress) * smoothingFactor;

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      previousFrameTime = timestamp;
      applyProgress(currentProgress);

      if (currentProgress !== targetProgress) {
        animationFrame = window.requestAnimationFrame(animateToScrollPosition);
      } else {
        previousFrameTime = 0;
      }
    };

    const updateTargetProgress = () => {
      targetProgress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);

      if (animationFrame === 0) {
        previousFrameTime = window.performance.now();
        animationFrame = window.requestAnimationFrame(animateToScrollPosition);
      }
    };

    const handleResize = () => {
      measureMaximumInlineInset();
      applyProgress(currentProgress);
      updateTargetProgress();
    };

    measureMaximumInlineInset();
    applyProgress(currentProgress);
    window.addEventListener("scroll", updateTargetProgress, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const sections = navigationItems.flatMap((item) => {
      const section = document.getElementById(item.href.slice(1));

      return section ? [{ href: item.href, section }] : [];
    });

    if (sections.length === 0) {
      return;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;

      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const activationLine = headerBottom + (window.innerHeight - headerBottom) * 0.35;
      let nextActiveHref: NavigationHref | null = null;

      for (const { href, section } of sections) {
        const sectionRect = section.getBoundingClientRect();

        if (sectionRect.top <= activationLine && sectionRect.bottom > activationLine) {
          nextActiveHref = href;
          break;
        }
      }

      setActiveHref((currentHref) => (currentHref === nextActiveHref ? currentHref : nextActiveHref));
    };

    const scheduleActiveSectionUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    scheduleActiveSectionUpdate();
    window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveSectionUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useLayoutEffect(() => {
    const track = navTrackRef.current;
    const indicator = navIndicatorRef.current;

    if (!track || !indicator || !highlightedHref) {
      return;
    }

    const highlightedLink = track.querySelector<HTMLAnchorElement>(
      'a[href="' + highlightedHref + '"]',
    );

    if (!highlightedLink) {
      return;
    }

    const updateIndicatorPosition = () => {
      const trackRect = track.getBoundingClientRect();
      const linkRect = highlightedLink.getBoundingClientRect();

      indicator.style.setProperty("--site-nav-indicator-left", linkRect.left - trackRect.left + "px");
      indicator.style.setProperty("--site-nav-indicator-top", linkRect.top - trackRect.top + "px");
      indicator.style.setProperty("--site-nav-indicator-width", linkRect.width + "px");
      indicator.style.setProperty("--site-nav-indicator-height", linkRect.height + "px");
    };

    updateIndicatorPosition();

    const resizeObserver = new ResizeObserver(updateIndicatorPosition);
    resizeObserver.observe(track);
    resizeObserver.observe(highlightedLink);
    window.addEventListener("resize", updateIndicatorPosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicatorPosition);
    };
  }, [highlightedHref]);

  useEffect(() => {
    const nav = navRef.current;
    const track = navTrackRef.current;

    if (!nav || !track || !activeHref) {
      return;
    }

    const activeLink = track.querySelector<HTMLAnchorElement>('a[href="' + activeHref + '"]');

    if (!activeLink) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const isOutsideVisibleArea = linkRect.left < navRect.left || linkRect.right > navRect.right;

    if (isOutsideVisibleArea) {
      const nextScrollLeft =
        nav.scrollLeft + linkRect.left + linkRect.width / 2 - (navRect.left + navRect.width / 2);

      nav.scrollTo({ behavior: "smooth", left: nextScrollLeft });
    }
  }, [activeHref]);

  return (
    <header className="site-header" onClick={handleSectionLinkClick} ref={headerRef}>
      <div className="site-header__shell">
        <div className="site-header__top">
          <a aria-label="CGT Enterprises home" className="site-brand" href="#home">
            <span className="site-brand__mark">{business.name}</span>
          </a>

          <nav className="site-nav" aria-label="Primary" ref={navRef}>
            <div className="site-nav__track" ref={navTrackRef}>
              <span
                aria-hidden="true"
                className={
                  "site-nav__indicator" +
                  (highlightedHref ? " site-nav__indicator--visible" : "") +
                  (hoveredHref ? " site-nav__indicator--preview" : "")
                }
                ref={navIndicatorRef}
              />
              <NavigationLinks
                activeHref={activeHref}
                highlightedHref={highlightedHref}
                onHoverChange={setHoveredHref}
              />
            </div>
          </nav>

          <div className="site-header__action">
            <Button href="#contact" variant="header">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
