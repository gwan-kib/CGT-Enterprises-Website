import type { Service } from "../../data/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <span className="service-card__icon material-symbols-rounded" aria-hidden="true">
        {service.icon}
      </span>
      <h3 className="service-card__title">{service.name}</h3>
      <span className="service-card__price">{service.price}</span>
      <p className="service-card__description">{service.description}</p>

      <div className="service-card__info">
        <a className="service-card__link" href="#contact">
          Book Service
        </a>
        <span className="service-card__number" aria-hidden="true">
          {service.id}
        </span>
      </div>
    </article>
  );
}
