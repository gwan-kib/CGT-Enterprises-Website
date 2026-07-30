import { useCallback, useEffect, useRef, useState } from "react";
import type { Service } from "../../data/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const hasDetails = service.showDetails && service.details && service.details.length > 0;

  const openDetails = useCallback(() => setExpanded(true), []);
  const closeDetails = useCallback(() => {
    setExpanded(false);
    detailsButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusable = overlay.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    focusable?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeDetails();
      }
    }

    overlay.addEventListener("keydown", handleKeyDown);
    return () => overlay.removeEventListener("keydown", handleKeyDown);
  }, [expanded, closeDetails]);

  function handleBookClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("cgt:select-service", { detail: service.id }));
    window.location.hash = "contact";
  }

  return (
    <article className={`service-card ${expanded ? "service-card--overlay-open" : ""}`}>
      <div className="service-card__body">
        <span className="service-card__icon material-symbols-rounded" aria-hidden="true">
          {service.icon}
        </span>
        <h3 className="service-card__title">{service.name}</h3>
        <span className="service-card__price">{service.price}</span>
        <p className="service-card__description">{service.description}</p>

        <div className="service-card__info">
          {hasDetails && (
            <button
              aria-expanded={expanded}
              className="service-card__details"
              onClick={openDetails}
              ref={detailsButtonRef}
              type="button"
            >
              Details
              <span className="material-symbols-rounded" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          )}
          <a className="service-card__link" href="#contact" onClick={handleBookClick}>
            Book Service
          </a>

          <span className="service-card__number" aria-hidden="true">
            {service.id}
          </span>
        </div>
      </div>

      {hasDetails && (
        <div
          aria-hidden={!expanded}
          aria-label={`Details for ${service.name}`}
          className={`service-card__details-overlay ${expanded ? "service-card__details-overlay--open" : ""}`}
          ref={overlayRef}
          role="region"
        >
          <div className="service-card__details-body">
            {service.details!.map((paragraph, i) => (
              <p className="service-card__details-text" key={i}>{paragraph}</p>
            ))}
          </div>
          <button
            className="service-card__details-close-bottom"
            onClick={closeDetails}
            type="button"
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      )}
    </article>
  );
}
