import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

import logoBadge from "../../assets/images/CGT Logo Badge (trimmed).png";
import { navigationItems } from "../../data/navigation";

type NavigationHref = (typeof navigationItems)[number]["href"];

function getNavigationHref(hash: string): NavigationHref | null {
  return navigationItems.find((item) => item.href === hash)?.href ?? null;
}

interface NavigationLinksProps {
  activeHref: NavigationHref | null;
  highlightedHref: NavigationHref | null;
  isHeroSectionActive: boolean;
  onHoverChange: (href: NavigationHref | null) => void;
}

function NavigationLinks({ activeHref, highlightedHref, isHeroSectionActive, onHoverChange }: NavigationLinksProps) {
  return (
    <ul className="site-nav__list">
      {navigationItems.map((item) => {
        const isActive = activeHref === item.href;
        const isHighlighted = highlightedHref === item.href;

        return (
          <li key={item.href}>
            <a
              aria-current={isActive ? "location" : undefined}
              className={`site-nav__link${isHeroSectionActive ? " site-nav__link--hero-active" : ""}${isHighlighted ? " site-nav__link--highlighted" : ""}`}
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
  section.scrollIntoView({ behavior: "smooth", block: "start" });

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
  const [activeHref, setActiveHref] = useState<NavigationHref | null>(() => getNavigationHref(window.location.hash));
  const [hoveredHref, setHoveredHref] = useState<NavigationHref | null>(null);
  const [isHeroSectionActive, setIsHeroSectionActive] = useState(() => window.scrollY <= 0);
  const highlightedHref = hoveredHref ?? activeHref;

  const handleSectionNavigation = (href: NavigationHref | null) => {
    isNavigationScrollingRef.current = true;
    setHoveredHref(null);
    setActiveHref(href);
  };

  useEffect(() => {
    const syncActiveHrefFromHash = () => {
      setActiveHref(getNavigationHref(window.location.hash));
      isNavigationScrollingRef.current = true;
    };

    const syncHeroSectionState = () => {
      const heroSection = document.getElementById("home");

      if (!heroSection) {
        setIsHeroSectionActive(false);
        return;
      }

      const heroSectionHeight = heroSection.getBoundingClientRect().height;
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      setIsHeroSectionActive(window.scrollY <= heroSectionHeight * 0.5 + headerHeight);
    };

    syncHeroSectionState();

    const heroSection = document.getElementById("home");
    const heroSectionObserver = heroSection ? new ResizeObserver(syncHeroSectionState) : null;

    if (heroSectionObserver && heroSection) {
      heroSectionObserver.observe(heroSection);
    }

    window.addEventListener("hashchange", syncActiveHrefFromHash);
    window.addEventListener("popstate", syncActiveHrefFromHash);
    window.addEventListener("scroll", syncHeroSectionState, { passive: true });
    window.addEventListener("resize", syncHeroSectionState);

    return () => {
      heroSectionObserver?.disconnect();
      window.removeEventListener("hashchange", syncActiveHrefFromHash);
      window.removeEventListener("popstate", syncActiveHrefFromHash);
      window.removeEventListener("scroll", syncHeroSectionState);
      window.removeEventListener("resize", syncHeroSectionState);
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

      const heroSectionHeight = document.getElementById("home")?.getBoundingClientRect().height ?? 0;
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const activationLine = heroSectionHeight * 0.5 - headerHeight;
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

    const highlightedLink = track.querySelector<HTMLAnchorElement>('a[href="' + highlightedHref + '"]');

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
      const nextScrollLeft = nav.scrollLeft + linkRect.left + linkRect.width / 2 - (navRect.left + navRect.width / 2);

      nav.scrollTo({ behavior: "smooth", left: nextScrollLeft });
    }
  }, [activeHref]);

  return (
    <header
      className="site-header"
      onClick={(event) => handleSectionLinkClick(event, handleSectionNavigation)}
      ref={headerRef}
    >
      <div className="site-header__shell">
        <div aria-hidden="true" className="site-header__backdrop" />
        <div className="site-header__top">
          <div className="site-header__brand">
            <a aria-label="CGT Enterprises home" className="site-brand" href="#home">
              <img alt="" aria-hidden="true" className="site-brand__badge" src={logoBadge} />
            </a>
          </div>

          <div className="site-header__nav">
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
                  isHeroSectionActive={isHeroSectionActive}
                  onHoverChange={setHoveredHref}
                />
              </div>
            </nav>
          </div>

          <div className="site-header__action">
            <a className="site-nav__link site-nav__link--header" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
