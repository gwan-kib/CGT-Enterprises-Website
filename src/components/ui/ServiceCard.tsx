import type { Service } from "../../data/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      
      <h3 className="service-card__title">{service.name}</h3>
      <p className="service-card__description">{service.description}</p>

      <div className="service-card__info">
        <span className="service-card__price">{service.price}</span>
        <a className="service-card__link" href="#contact">
          Inquire about service
        </a>
        <span className="service-card__number" aria-hidden="true">
          {service.id}
        </span>
      </div>
    </article>
  );
}
