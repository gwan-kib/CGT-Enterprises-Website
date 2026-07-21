import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
} from 'react'
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
type MoveDirection = Exclude<CarouselDirection, 'idle'>

interface CarouselState {
  activeIndex: number
  direction: CarouselDirection
  motionOriginIndex: number | null
  queuedDirection: MoveDirection | null
  remainingSteps: number
}

export function ServicesSection() {
  const serviceCount = placeholderServices.length
  const [carouselState, setCarouselState] = useState<CarouselState>(() => ({
    activeIndex: getInitialActiveServiceIndex(serviceCount),
    direction: 'idle',
    motionOriginIndex: null,
    queuedDirection: null,
    remainingSteps: 0,
  }))
  const activeCardRef = useRef<HTMLElement>(null)
  const carouselTrackRef = useRef<HTMLDivElement>(null)
  const shouldFocusActiveCard = useRef(false)
  const activeService = placeholderServices[carouselState.activeIndex]
  const visibleServiceIndexes = getVisibleServiceIndexes(
    serviceCount,
    carouselState.activeIndex,
  )
  const activePosition = visibleServiceIndexes.indexOf(
    carouselState.activeIndex,
  )
  const carouselStyle = {
    '--services-visible-count': visibleServiceIndexes.length,
  } as CSSProperties
  const isMoving =
    carouselState.direction !== 'idle' || carouselState.remainingSteps > 0
  const renderedServiceItems = visibleServiceIndexes.map(
    (serviceIndex, position) => ({
      isBuffer: false,
      isMotionOrigin: serviceIndex === carouselState.motionOriginIndex,
      isMobileSlideVisible:
        serviceIndex === carouselState.activeIndex ||
        (carouselState.direction === 'previous' &&
          position === activePosition - 1) ||
        (carouselState.direction === 'next' &&
          position === activePosition + 1),
      key: placeholderServices[serviceIndex].id,
      position,
      serviceIndex,
    }),
  )

  if (visibleServiceIndexes.length > 0) {
    const movementDirection =
      carouselState.direction === 'previous' ? 'previous' : 'next'
    const edgeIndex =
      movementDirection === 'next'
        ? visibleServiceIndexes[visibleServiceIndexes.length - 1]
        : visibleServiceIndexes[0]
    const bufferServiceIndex = getWrappedServiceIndex(
      edgeIndex,
      movementDirection,
      serviceCount,
    )
    const bufferItem = {
      isBuffer: true,
      isMotionOrigin: false,
      isMobileSlideVisible:
        carouselState.direction === 'next' &&
        !renderedServiceItems.some(
          (item) =>
            item.isMobileSlideVisible &&
            item.serviceIndex !== carouselState.activeIndex,
        ),
      key: 'service-carousel-buffer',
      position: -1,
      serviceIndex: bufferServiceIndex,
    }

    renderedServiceItems.push(bufferItem)
  }

  useEffect(() => {
    if (
      carouselState.direction === 'idle' &&
      carouselState.remainingSteps === 0 &&
      shouldFocusActiveCard.current
    ) {
      activeCardRef.current?.focus()
      shouldFocusActiveCard.current = false
    }
  }, [
    carouselState.activeIndex,
    carouselState.direction,
    carouselState.remainingSteps,
  ])

  useEffect(() => {
    if (
      carouselState.direction !== 'idle' ||
      carouselState.remainingSteps === 0 ||
      !carouselState.queuedDirection
    ) {
      return
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setCarouselState((currentState) => {
        if (
          currentState.direction !== 'idle' ||
          currentState.remainingSteps === 0 ||
          !currentState.queuedDirection
        ) {
          return currentState
        }

        return {
          ...currentState,
          direction: currentState.queuedDirection,
        }
      })
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [
    carouselState.direction,
    carouselState.queuedDirection,
    carouselState.remainingSteps,
  ])

  useLayoutEffect(() => {
    if (carouselState.direction === 'idle') {
      return
    }

    const track = carouselTrackRef.current
    const visibleItem = track
      ? Array.from(
          track.querySelectorAll<HTMLElement>('.services-carousel__item'),
        ).find((item) => item.getBoundingClientRect().width > 0)
      : undefined

    if (!track || !visibleItem) {
      return
    }

    const columnGap = Number.parseFloat(window.getComputedStyle(track).columnGap)
    const slideDistance =
      visibleItem.getBoundingClientRect().width +
      (Number.isFinite(columnGap) ? columnGap : 0)

    track.style.setProperty('--services-card-width', `${visibleItem.offsetWidth}px`)
    track.style.setProperty('--services-slide-distance', `${slideDistance}px`)
  }, [carouselState.direction])

  function moveCarousel(direction: MoveDirection, steps = 1) {
    if (serviceCount <= 1 || isMoving) {
      return
    }

    setCarouselState((currentState) => ({
      ...currentState,
      direction,
      queuedDirection: direction,
      motionOriginIndex: currentState.activeIndex,
      remainingSteps: steps,
    }))
  }

  function selectService(serviceIndex: number, position: number) {
    if (
      serviceIndex === carouselState.activeIndex ||
      activePosition < 0 ||
      position < 0
    ) {
      return
    }

    shouldFocusActiveCard.current = true
    moveCarousel(
      position < activePosition ? 'previous' : 'next',
      Math.abs(position - activePosition),
    )
  }

  function completeCarouselMove(event: AnimationEvent<HTMLDivElement>) {
    if (
      event.target !== event.currentTarget ||
      carouselState.direction === 'idle'
    ) {
      return
    }

    setCarouselState((currentState) => {
      if (currentState.direction === 'idle') {
        return currentState
      }

      const remainingSteps = Math.max(currentState.remainingSteps - 1, 0)

      return {
        activeIndex: getWrappedServiceIndex(
          currentState.activeIndex,
          currentState.direction,
          serviceCount,
        ),
        direction: 'idle',
        motionOriginIndex:
          remainingSteps > 0 ? currentState.motionOriginIndex : null,
        queuedDirection:
          remainingSteps > 0 ? currentState.queuedDirection : null,
        remainingSteps,
      }
    })
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
          onAnimationEnd={completeCarouselMove}
          data-moving={isMoving ? 'true' : 'false'}
          ref={carouselTrackRef}
          style={carouselStyle}
        >
          {renderedServiceItems.map(
            ({
              isBuffer,
              isMobileSlideVisible,
              key,
              isMotionOrigin,
              position,
              serviceIndex,
            }) => {
              const service = placeholderServices[serviceIndex]
              const isActive = serviceIndex === carouselState.activeIndex

              return (
                <div
                  aria-hidden={isBuffer ? true : undefined}
                  className={`services-carousel__item${isActive ? ' is-active' : ' is-inactive'}${isBuffer ? ' is-buffer' : ''}${isMotionOrigin ? ' is-motion-origin' : ''}${isMobileSlideVisible ? ' is-mobile-slide-visible' : ''}`}
                  inert={isBuffer ? true : undefined}
                  key={key}
                >
                  <ServiceCard
                    articleRef={
                      isActive && !isBuffer ? activeCardRef : undefined
                    }
                    isActive={isActive}
                    onSelect={
                      isActive || isBuffer
                        ? undefined
                        : () => selectService(serviceIndex, position)
                    }
                    selectionDisabled={isMoving || isBuffer}
                    service={service}
                  />
                </div>
              )
            },
          )}
        </div>

        <div className="services-carousel__controls">
          <button
            aria-label="Show previous service"
            className="services-carousel__control"
            disabled={serviceCount <= 1 || isMoving}
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
            disabled={serviceCount <= 1 || isMoving}
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
