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
  getServiceIndexAtOffset,
  getVisibleServiceIndexes,
} from './servicesCarousel'

type CarouselDirection = 'idle' | 'next' | 'previous'
type MoveDirection = Exclude<CarouselDirection, 'idle'>

interface CarouselState {
  activeIndex: number
  direction: CarouselDirection
  steps: number
  targetIndex: number | null
}

interface RenderedServiceItem {
  bufferStep?: number
  bufferViewport?: 'desktop' | 'mobile'
  isBuffer: boolean
  isMobileSlideVisible: boolean
  key: string
  position: number
  serviceIndex: number
}

export function ServicesSection() {
  const serviceCount = placeholderServices.length
  const [carouselState, setCarouselState] = useState<CarouselState>(() => ({
    activeIndex: getInitialActiveServiceIndex(serviceCount),
    direction: 'idle',
    steps: 0,
    targetIndex: null,
  }))
  const activeCardRef = useRef<HTMLElement>(null)
  const carouselTrackRef = useRef<HTMLDivElement>(null)
  const movementLockRef = useRef(false)
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
    '--services-motion-extra-duration':
      String(Math.max(carouselState.steps - 1, 0) * 125) + 'ms',
  } as CSSProperties
  const isMoving = carouselState.direction !== 'idle'
  const renderedServiceItems: RenderedServiceItem[] =
    visibleServiceIndexes.map((serviceIndex, position) => ({
      isBuffer: false,
      isMobileSlideVisible: serviceIndex === carouselState.activeIndex,
      key: placeholderServices[serviceIndex].id,
      position,
      serviceIndex,
    }))

  if (visibleServiceIndexes.length > 0) {
    const movementDirection =
      carouselState.direction === 'previous' ? 'previous' : 'next'
    const movementOffset = movementDirection === 'next' ? 1 : -1
    const edgeIndex =
      movementDirection === 'next'
        ? visibleServiceIndexes[visibleServiceIndexes.length - 1]
        : visibleServiceIndexes[0]
    const bufferCount = Math.max(carouselState.steps, 1)

    for (let bufferStep = 1; bufferStep <= bufferCount; bufferStep += 1) {
      renderedServiceItems.push(
        {
          bufferStep,
          bufferViewport: 'desktop',
          isBuffer: true,
          isMobileSlideVisible: true,
          key: 'service-carousel-desktop-buffer-' + bufferStep,
          position: -1,
          serviceIndex: getServiceIndexAtOffset(
            edgeIndex,
            movementOffset * bufferStep,
            serviceCount,
          ),
        },
        {
          bufferStep,
          bufferViewport: 'mobile',
          isBuffer: true,
          isMobileSlideVisible: true,
          key: 'service-carousel-mobile-buffer-' + bufferStep,
          position: -1,
          serviceIndex: getServiceIndexAtOffset(
            carouselState.activeIndex,
            movementOffset * bufferStep,
            serviceCount,
          ),
        },
      )
    }
  }

  useEffect(() => {
    if (
      carouselState.direction === 'idle' &&
      shouldFocusActiveCard.current
    ) {
      activeCardRef.current?.focus()
      shouldFocusActiveCard.current = false
    }
  }, [carouselState.activeIndex, carouselState.direction])

  useLayoutEffect(() => {
    if (carouselState.direction === 'idle') {
      return
    }

    const track = carouselTrackRef.current
    const visibleItem = track
      ? Array.from(
          track.querySelectorAll<HTMLElement>(
            '.services-carousel__item:not(.is-buffer)',
          ),
        ).find((item) => item.getBoundingClientRect().width > 0)
      : undefined

    if (!track || !visibleItem) {
      return
    }

    const columnGap = Number.parseFloat(window.getComputedStyle(track).columnGap)
    const slideDistance =
      visibleItem.getBoundingClientRect().width +
      (Number.isFinite(columnGap) ? columnGap : 0)

    track.style.setProperty(
      '--services-card-width',
      String(visibleItem.offsetWidth) + 'px',
    )
    track.style.setProperty(
      '--services-slide-distance',
      String(slideDistance * carouselState.steps) + 'px',
    )

    track
      .querySelectorAll<HTMLElement>('.services-carousel__item.is-buffer')
      .forEach((bufferItem) => {
        const bufferStep = Number(bufferItem.dataset.bufferStep)

        bufferItem.style.setProperty(
          '--services-buffer-offset',
          String(Math.max(bufferStep - 1, 0) * slideDistance) + 'px',
        )
      })
  }, [carouselState.direction, carouselState.steps])

  function moveCarousel(
    direction: MoveDirection,
    steps = 1,
    targetIndex?: number,
    restoreFocus = false,
  ) {
    if (serviceCount <= 1 || movementLockRef.current) {
      return
    }

    movementLockRef.current = true
    shouldFocusActiveCard.current = restoreFocus
    setCarouselState((currentState) => ({
      ...currentState,
      direction,
      steps,
      targetIndex:
        targetIndex ??
        getServiceIndexAtOffset(
          currentState.activeIndex,
          (direction === 'next' ? 1 : -1) * steps,
          serviceCount,
        ),
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

    moveCarousel(
      position < activePosition ? 'previous' : 'next',
      Math.abs(position - activePosition),
      serviceIndex,
      true,
    )
  }

  function completeCarouselMove(event: AnimationEvent<HTMLDivElement>) {
    if (
      event.target !== event.currentTarget ||
      carouselState.direction === 'idle'
    ) {
      return
    }

    movementLockRef.current = false
    setCarouselState((currentState) => {
      if (
        currentState.direction === 'idle' ||
        currentState.targetIndex === null
      ) {
        return currentState
      }

      return {
        activeIndex: currentState.targetIndex,
        direction: 'idle',
        steps: 0,
        targetIndex: null,
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
              bufferStep,
              bufferViewport,
              isBuffer,
              isMobileSlideVisible,
              key,
              position,
              serviceIndex,
            }) => {
              const service = placeholderServices[serviceIndex]
              const isActive = serviceIndex === carouselState.activeIndex

              return (
                <div
                  aria-hidden={isBuffer ? true : undefined}
                  className={`services-carousel__item${isActive ? ' is-active' : ' is-inactive'}${isBuffer ? ` is-buffer is-${bufferViewport}-buffer` : ''}${isMobileSlideVisible ? ' is-mobile-slide-visible' : ''}`}
                  data-buffer-step={bufferStep}
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
