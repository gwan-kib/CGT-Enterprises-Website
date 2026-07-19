import type { Ref } from 'react'
import type { Service } from '../../data/services'

interface ServiceCardProps {
  articleRef?: Ref<HTMLElement>
  isActive: boolean
  onSelect?: () => void
  service: Service
}

export function ServiceCard({
  articleRef,
  isActive,
  onSelect,
  service,
}: ServiceCardProps) {
  return (
    <article
      className={`service-card${isActive ? ' is-active' : ' is-inactive'}`}
      data-active={isActive}
      ref={articleRef}
      tabIndex={isActive ? -1 : undefined}
    >
      <div className="service-card__topline">
        <span className="service-card__number" aria-hidden="true">
          {service.id}
        </span>
        <span className="service-card__price">{service.price}</span>
      </div>
      <span className="service-card__state">
        {isActive ? 'Current service' : 'Available service'}
      </span>
      <h3 className="service-card__title">{service.name}</h3>
      <p className="service-card__description">{service.description}</p>
      {isActive ? (
        <a className="service-card__link" href="#contact">
          Enquire about this service
        </a>
      ) : (
        <>
          <span aria-hidden="true" className="service-card__select-label">
            Select this service
          </span>
          <button
            aria-label={`Make ${service.name} the current service`}
            className="service-card__select"
            onClick={onSelect}
            type="button"
          />
        </>
      )}
    </article>
  )
}
