import type { Service } from '../../data/services'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="service-card__topline">
        <span className="service-card__number" aria-hidden="true">
          {service.id}
        </span>
        <span className="service-card__price">{service.price}</span>
      </div>
      <h3 className="service-card__title">{service.name}</h3>
      <p className="service-card__description">{service.description}</p>
      <a className="service-card__link" href="#contact">
        Enquire about this service
      </a>
    </article>
  )
}
