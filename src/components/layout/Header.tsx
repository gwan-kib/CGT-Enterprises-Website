import { useEffect, useRef } from "react";

import logoBadge from "../../assets/images/CGT Logo Badge (trimmed).png";
import { navigationItems } from "../../data/navigation";
import { Button } from "../ui/Button";

function NavigationLinks() {
  return (
    <ul className="site-nav__list">
      {navigationItems.map((item) => (
        <li key={item.href}>
          <a className="site-nav__link" href={item.href}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

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
    const maximumRadius = 16;
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

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-header__shell">
        <div className="site-header__top">
          <a aria-label="CGT Enterprises home" className="site-brand" href="#home">
            <img alt="" className="site-brand__mark" height="128" src={logoBadge} width="128" />
          </a>

          <nav className="site-nav" aria-label="Primary">
            <NavigationLinks />
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
