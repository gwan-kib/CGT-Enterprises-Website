import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { placeholderServices } from '../../data/services'
import { SectionContainer } from '../layout/SectionContainer'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'
import {
  getInitialActiveServiceIndex,
  getVisibleServiceIndexes,
  getWrappedServiceIndex,
} from './servicesCarousel'

type CarouselDirection = 'idle' | 'next' | 'previous'

interface CarouselState {
  activeIndex: number
  direction: CarouselDirection
  transitionKey: number
}

export function ServicesSection() {
  const serviceCount = placeholderServices.length
  const [carouselState, setCarouselState] = useState<CarouselState>(() => ({
    activeIndex: getInitialActiveServiceIndex(serviceCount),
    direction: 'idle',
    transitionKey: 0,
  }))
  const activeCardRef = useRef<HTMLElement>(null)
  const shouldFocusActiveCard = useRef(false)
  const activeService = placeholderServices[carouselState.activeIndex]
  const visibleServiceIndexes = getVisibleServiceIndexes(
    serviceCount,
    carouselState.activeIndex,
  )
  const carouselStyle = {
    '--services-visible-count': visibleServiceIndexes.length,
  } as CSSProperties

  useEffect(() => {
    if (shouldFocusActiveCard.current) {
      activeCardRef.current?.focus()
      shouldFocusActiveCard.current = false
    }
  }, [carouselState.activeIndex])

  function moveCarousel(direction: Exclude<CarouselDirection, 'idle'>) {
    if (serviceCount <= 1) {
      return
    }

    setCarouselState((currentState) => ({
      activeIndex: getWrappedServiceIndex(
        currentState.activeIndex,
        direction,
        serviceCount,
      ),
      direction,
      transitionKey: currentState.transitionKey + 1,
    }))
  }

  function selectService(
    serviceIndex: number,
    direction: Exclude<CarouselDirection, 'idle'>,
  ) {
    if (serviceIndex === carouselState.activeIndex) {
      return
    }

    shouldFocusActiveCard.current = true
    setCarouselState((currentState) => ({
      activeIndex: serviceIndex,
      direction,
      transitionKey: currentState.transitionKey + 1,
    }))
  }

  return (
    <SectionContainer id="services" labelledBy="services-title" tone="subtle">
      <div className="services-section__intro">
        <SectionHeading
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. The final service names, descriptions, and prices will replace these placeholders."
          eyebrow="(02) Services and pricing"
          id="services-title"
          title="A clear place to compare available services."
        />
      </div>

      <div
        aria-label="Services carousel"
        aria-roledescription="carousel"
        className="services-carousel"
        role="region"
      >
        <div
          className="services-carousel__track"
          data-transition={carouselState.direction}
          key={carouselState.transitionKey}
          style={carouselStyle}
        >
          {visibleServiceIndexes.map((serviceIndex, position) => {
            const service = placeholderServices[serviceIndex]
            const isActive = serviceIndex === carouselState.activeIndex

            return (
              <div
                className={`services-carousel__item${isActive ? ' is-active' : ' is-inactive'}`}
                key={service.id}
              >
                <ServiceCard
                  articleRef={isActive ? activeCardRef : undefined}
                  isActive={isActive}
                  onSelect={
                    isActive
                      ? undefined
                      : () =>
                          selectService(
                            serviceIndex,
                            position === 0 ? 'previous' : 'next',
                          )
                  }
                  service={service}
                />
              </div>
            )
          })}
        </div>

        <div className="services-carousel__controls">
          <button
            aria-label="Show previous service"
            className="services-carousel__control"
            disabled={serviceCount <= 1}
            onClick={() => moveCarousel('previous')}
            type="button"
          >
            Previous
          </button>
          <p
            aria-atomic="true"
            aria-live="polite"
            className="services-carousel__position"
          >
            Service {carouselState.activeIndex + 1} of {serviceCount}
            {activeService ? `: ${activeService.name}` : ''}
          </p>
          <button
            aria-label="Show next service"
            className="services-carousel__control"
            disabled={serviceCount <= 1}
            onClick={() => moveCarousel('next')}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </SectionContainer>
  )
}
