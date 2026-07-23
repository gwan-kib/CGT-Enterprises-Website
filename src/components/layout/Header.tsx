import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

import { business } from "../../data/business";
import { navigationItems } from "../../data/navigation";
import { Button } from "../ui/Button";

type NavigationHref = (typeof navigationItems)[number]["href"];
type HeaderContrast = "on-dark" | "on-light";

function getHeaderContrastBehind(header: HTMLElement, x: number, y: number): HeaderContrast {
  const sampleX = Math.min(Math.max(x, 0), window.innerWidth - 1);
  const sampleY = Math.min(Math.max(y, 0), window.innerHeight - 1);

  for (const element of document.elementsFromPoint(sampleX, sampleY)) {
    if (header.contains(element)) {
      continue;
    }

    const section = element.closest<HTMLElement>("[data-header-contrast]");
    const contrast = section?.dataset.headerContrast;

    if (contrast === "on-dark" || contrast === "on-light") {
      return contrast;
    }
  }

  return "on-light";
}

function getNavigationHref(hash: string): NavigationHref | null {
  return navigationItems.find((item) => item.href === hash)?.href ?? null;
}

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

function handleSectionLinkClick(
  event: MouseEvent<HTMLElement>,
  onSectionNavigation: (href: NavigationHref | null) => void,
) {
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

  onSectionNavigation(getNavigationHref(link.hash));

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
  const isNavigationScrollingRef = useRef(false);
  const [activeHref, setActiveHref] = useState<NavigationHref | null>(() =>
    getNavigationHref(window.location.hash),
  );
  const [hoveredHref, setHoveredHref] = useState<NavigationHref | null>(null);
  const highlightedHref = hoveredHref ?? activeHref;

  const handleSectionNavigation = (href: NavigationHref | null) => {
    isNavigationScrollingRef.current = true;

    if (href) {
      setActiveHref(href);
    }
  };

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    // Distance, in pixels, over which the shell completes its transformation.
    const scrollRange = 120;
    // Time-based easing strength. Higher values settle faster.
    const smoothingRate = 14;
    // Final downward offset matches the extra space reserved by --anchor-offset.
    const maximumTranslateY = 16;
    // The maximum blur is configured beside the header styles for easy tuning.
    const maximumBackdropBlur =
      Number.parseFloat(
        getComputedStyle(header).getPropertyValue("--header-backdrop-blur-maximum"),
      );

    const getFullWidthInlineInset = () => {
      const pageContent = document.querySelector<HTMLElement>(".page-section__inner");

      if (pageContent) {
        return pageContent.getBoundingClientRect().left;
      }

      return Math.max(20, (window.innerWidth - 1200) / 2);
    };

    // Keep a viewport-relative safety inset while allowing the outer pills to
    // move beyond the centered page-content boundary.
    const getFloatingInlineInset = () =>
      Math.min(20, Math.max(12, window.innerWidth * 0.04));

    const shell = header.querySelector<HTMLElement>(".site-header__shell");
    const colorZones = header.querySelectorAll<HTMLElement>("[data-header-color-zone]");

    const syncHeaderContrasts = () => {
      if (shell) {
        const shellRect = shell.getBoundingClientRect();
        const shellContrast = getHeaderContrastBehind(
          header,
          shellRect.left + shellRect.width / 2,
          shellRect.top + shellRect.height / 2,
        );

        if (header.dataset.headerContrast !== shellContrast) {
          header.dataset.headerContrast = shellContrast;
        }
      }

      for (const zone of colorZones) {
        const zoneRect = zone.getBoundingClientRect();
        const zoneContrast = getHeaderContrastBehind(
          header,
          zoneRect.left + zoneRect.width / 2,
          zoneRect.top + zoneRect.height / 2,
        );

        if (zone.dataset.headerContrast !== zoneContrast) {
          zone.dataset.headerContrast = zoneContrast;
        }
      }
    };

    let targetProgress = Math.min(window.scrollY / scrollRange, 1);
    let currentProgress = targetProgress;
    let animationFrame = 0;
    let previousFrameTime = 0;

    const applyProgress = (progress: number) => {
      const fullWidthInlineInset = getFullWidthInlineInset();
      const floatingInlineInset = getFloatingInlineInset();
      const currentInlineInset =
        fullWidthInlineInset + (floatingInlineInset - fullWidthInlineInset) * progress;
      const currentBarBlur = maximumBackdropBlur * (1 - progress);
      const currentPillBlur = maximumBackdropBlur * progress;

      header.style.setProperty("--header-shell-translate-y", (maximumTranslateY * progress).toFixed(2) + "px");
      header.style.setProperty(
        "--header-shell-inline-inset",
        currentInlineInset.toFixed(2) + "px",
      );
      header.style.setProperty(
        "--header-bar-blur",
        currentBarBlur.toFixed(2) + "px",
      );
      header.style.setProperty(
        "--header-pill-blur",
        currentPillBlur.toFixed(2) + "px",
      );
      header.dataset.layoutState =
        progress <= 0.001 ? "bar" : progress >= 0.999 ? "pills" : "transition";

      syncHeaderContrasts();
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

    applyProgress(currentProgress);
    window.addEventListener("scroll", updateTargetProgress, { passive: true });
    window.addEventListener("resize", updateTargetProgress);

    return () => {
      window.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", updateTargetProgress);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const syncActiveHrefFromHash = () => {
      setActiveHref(getNavigationHref(window.location.hash));
      isNavigationScrollingRef.current = true;
    };

    window.addEventListener("hashchange", syncActiveHrefFromHash);
    window.addEventListener("popstate", syncActiveHrefFromHash);

    return () => {
      window.removeEventListener("hashchange", syncActiveHrefFromHash);
      window.removeEventListener("popstate", syncActiveHrefFromHash);
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

      if (isNavigationScrollingRef.current) {
        return;
      }

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
      if (isNavigationScrollingRef.current || animationFrame !== 0) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const releaseNavigationScroll = (event?: Event) => {
      if (event && event.target !== document) {
        return;
      }

      isNavigationScrollingRef.current = false;
    };

    const handleUserScrollIntent = () => {
      if (!isNavigationScrollingRef.current) {
        return;
      }

      releaseNavigationScroll();
    };

    const handleScrollKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
        case "End":
        case "Home":
        case "PageDown":
        case "PageUp":
        case " ":
          handleUserScrollIntent();
          break;
      }
    };

    window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
    document.addEventListener("scrollend", releaseNavigationScroll);
    window.addEventListener("wheel", handleUserScrollIntent, { passive: true });
    window.addEventListener("touchstart", handleUserScrollIntent, { passive: true });
    window.addEventListener("keydown", handleScrollKey);

    return () => {
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      document.removeEventListener("scrollend", releaseNavigationScroll);
      window.removeEventListener("wheel", handleUserScrollIntent);
      window.removeEventListener("touchstart", handleUserScrollIntent);
      window.removeEventListener("keydown", handleScrollKey);
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
    <header
      className="site-header"
      data-header-contrast="on-dark"
      data-layout-state="bar"
      onClick={(event) => handleSectionLinkClick(event, handleSectionNavigation)}
      ref={headerRef}
    >
      <div className="site-header__shell">
        <div aria-hidden="true" className="site-header__backdrop" />
        <div className="site-header__top">
          <div
            className="site-header__group site-header__group--brand"
            data-header-contrast="on-dark"
            data-header-color-zone
          >
            <a aria-label="CGT Enterprises home" className="site-brand" href="#home">
              <span className="site-brand__mark">{business.name}</span>
            </a>
          </div>

          <div
            className="site-header__group site-header__group--nav"
            data-header-contrast="on-dark"
            data-header-color-zone
          >
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
          </div>

          <div
            className="site-header__action site-header__group site-header__group--action"
            data-header-contrast="on-dark"
            data-header-color-zone
          >
            <Button href="#contact" variant="header">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
