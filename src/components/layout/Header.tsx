import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

import brandBadge from "../../assets/CGT Enterprises Badge (alt).png";
import { navigationItems } from "../../data/navigation";
import { scrollToSection } from "../../utils/scroll";

type NavigationHref = (typeof navigationItems)[number]["href"];

const desktopNavigationItems = navigationItems.filter((item) => item.href !== "#home");

function getNavigationHref(hash: string): NavigationHref | null {
  return navigationItems.find((item) => item.href === hash)?.href ?? null;
}

interface NavigationLinksProps {
  activeHref: NavigationHref | null;
  highlightedHref: NavigationHref | null;
  isHeroSectionActive: boolean;
  onHoverChange: (href: NavigationHref | null) => void;
}

function NavigationLinks({
  activeHref,
  highlightedHref,
  isHeroSectionActive,
  onHoverChange,
}: NavigationLinksProps) {
  return (
    <>
      {desktopNavigationItems.map((item, index) => {
        const isActive = activeHref === item.href;
        const isHighlighted = highlightedHref === item.href;

        return (
          <li
            key={item.href}
            className="site-nav__link--enter"
            style={{ "--nav-enter-delay": `${index * 60}ms` } as React.CSSProperties}
          >
            <a
              aria-current={isActive ? "location" : undefined}
              className={`site-nav__link${isHeroSectionActive ? " site-nav__link--hero-active" : ""}${isHighlighted ? " site-nav__link--highlighted" : ""}`}
              href={item.href}
              onMouseEnter={() => onHoverChange(item.href)}
              onMouseLeave={() => onHoverChange(null)}
            >
              <span className="site-nav__icon material-symbols-rounded" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </a>
          </li>
        );
      })}
    </>
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
  scrollToSection(section);

  if (window.location.hash !== link.hash) {
    window.history.pushState(null, "", link.hash);
  }
}

export function Header({ homePath }: { homePath?: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navTrackRef = useRef<HTMLDivElement>(null);
  const navIndicatorRef = useRef<HTMLSpanElement>(null);
  const isNavigationScrollingRef = useRef(false);
  const [activeHref, setActiveHref] = useState<NavigationHref | null>(() => getNavigationHref(window.location.hash));
  const [hoveredHref, setHoveredHref] = useState<NavigationHref | null>(null);
  const [isHeroSectionActive, setIsHeroSectionActive] = useState(() => window.scrollY <= 0);
  const hoverPreviewHref = hoveredHref === "#home" && isHeroSectionActive ? null : hoveredHref;
  const highlightedHref = hoverPreviewHref ?? (activeHref === "#home" ? null : activeHref);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSectionNavigation = (href: NavigationHref | null) => {
    isNavigationScrollingRef.current = true;
    setHoveredHref(null);
    setActiveHref(href);
  };

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

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
        }
      }

      if (nextActiveHref === null && sections.length > 0) {
        const isNearPageBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

        if (isNearPageBottom) {
          nextActiveHref = sections[sections.length - 1].href;
        }
      }

      setActiveHref((currentHref) => {
        if (currentHref === nextActiveHref) {
          return currentHref;
        }

        if (nextActiveHref && window.location.hash !== nextActiveHref) {
          window.history.replaceState(null, "", nextActiveHref);
        }

        return nextActiveHref;
      });
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

  if (homePath) {
    return (
      <header className="site-header" ref={headerRef}>
        <div className="site-header__shell">
          <div aria-hidden="true" className="site-header__backdrop" />
          <div className="site-header__top">
            <nav className="site-nav" aria-label="Primary">
              <ul className="site-nav__list">
                <li>
                  <a className="site-nav__link site-nav__link--header" href={homePath}>
                    <span className="site-nav__icon material-symbols-rounded" aria-hidden="true">
                      arrow_back
                    </span>
                    Main Page
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className="site-header"
      onClick={(event) => handleSectionLinkClick(event, handleSectionNavigation)}
      ref={headerRef}
    >
      <div className="site-header__shell">
        <div aria-hidden="true" className="site-header__backdrop" />
        <div className="site-header__top">
          <a className="site-header__brand" href="#home">
            <img alt="CGT Enterprises" className="site-header__brand-image" src={brandBadge} />
          </a>
          <nav className="site-nav site-nav--desktop" aria-label="Primary" ref={navRef}>
            <div className="site-nav__track" ref={navTrackRef}>
              <span
                aria-hidden="true"
                className={
                  "site-nav__indicator" +
                  (highlightedHref ? " site-nav__indicator--visible" : "") +
                  (hoverPreviewHref ? " site-nav__indicator--preview" : "")
                }
                ref={navIndicatorRef}
              />
              <ul className="site-nav__list">
                <NavigationLinks
                  activeHref={activeHref}
                  highlightedHref={highlightedHref}
                  isHeroSectionActive={isHeroSectionActive}
                  onHoverChange={setHoveredHref}
                />
              </ul>
            </div>
          </nav>
          <span
            className={"site-header__top-link-slot" + (isHeroSectionActive ? "" : " site-header__top-link-slot--open")}
            inert={isHeroSectionActive ? true : undefined}
          >
            <span className="site-header__top-link-clip">
              <a aria-label="Back to top" className="site-nav__link site-header__top-link" href="#home">
                <span className="site-nav__icon material-symbols-rounded" aria-hidden="true">
                  arrow_upward
                </span>
              </a>
            </span>
          </span>
          <button
            aria-controls="site-mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="site-header__menu-toggle"
            onClick={(event) => {
              event.stopPropagation();
              setIsMobileMenuOpen((open) => !open);
            }}
            type="button"
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
        <div
          className={"site-mobile-menu" + (isMobileMenuOpen ? " site-mobile-menu--open" : "")}
          id="site-mobile-menu"
        >
          <nav className="site-mobile-nav" aria-label="Mobile navigation">
            <ul className="site-mobile-nav__list">
              {navigationItems.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <li key={item.href}>
                    <a
                      aria-current={isActive ? "location" : undefined}
                      className={"site-mobile-nav__link" + (isActive ? " site-mobile-nav__link--active" : "")}
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        const sectionId = item.href.slice(1);
                        const section = document.getElementById(sectionId);

                        if (section) {
                          handleSectionNavigation(getNavigationHref(item.href));
                          scrollToSection(section);

                          if (window.location.hash !== item.href) {
                            window.history.pushState(null, "", item.href);
                          }
                        }

                        closeMobileMenu();
                      }}
                    >
                      <span className="site-mobile-nav__icon material-symbols-rounded" aria-hidden="true">
                        {item.icon}
                      </span>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
    )}
