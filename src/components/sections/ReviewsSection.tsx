import { useCallback, useEffect, useRef, useState } from "react";
import type { ReviewCardData } from "../ui/ReviewCard";
import { ReviewCard } from "../ui/ReviewCard";
import { SectionContainer } from "../layout/SectionContainer";
import { SectionHeading } from "../ui/SectionHeading";

function getCardCenter(card: HTMLElement): number {
  const rect = card.getBoundingClientRect();
  return rect.left + rect.width / 2;
}

function getContainerCenter(container: HTMLElement): number {
  const rect = container.getBoundingClientRect();
  return rect.left + rect.width / 2;
}

function findClosestCardIndex(container: HTMLElement): number {
  const allCards = Array.from(
    container.querySelectorAll<HTMLElement>(".review-card"),
  );
  if (allCards.length === 0) return -1;

  const containerCenter = getContainerCenter(container);
  let closestIndex = 0;
  let closestDistance = Infinity;

  allCards.forEach((card, index) => {
    const distance = Math.abs(getCardCenter(card) - containerCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

const placeholderReviews: ReviewCardData[] = [
  {
    id: "placeholder-1",
    date: "07/25/2026",
    detail: "Dump Runs",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed erat vitae sem tempor tincidunt.",
    rating: 5,
  },
  {
    id: "placeholder-2",
    date: "07/24/2026",
    detail: "Appliance Disposal",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed erat vitae sem tempor tincidunt.",
    rating: 5,
  },
  {
    id: "placeholder-3",
    date: "07/23/2026",
    detail: "Curbside Delivery",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed erat vitae sem tempor tincidunt.",
    rating: 5,
  },
  {
    id: "placeholder-4",
    date: "07/22/2026",
    detail: "Household Moving",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed erat vitae sem tempor tincidunt.",
    rating: 5,
  },
  {
    id: "placeholder-5",
    date: "07/21/2026",
    detail: "Beverage Recycling",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed erat vitae sem tempor tincidunt.",
    rating: 5,
  },
];

export function ReviewsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [closestIndex, setClosestIndex] = useState(0);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const isManualScrolling = useRef(false);

  const totalCards = placeholderReviews.length;
  const canScrollPrevious = closestIndex > 0;
  const canScrollNext = closestIndex < totalCards - 1;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const carousel = carouselRef.current;
    if (!carousel || e.pointerType !== "mouse") return;

    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = carousel.scrollLeft;
    carousel.setPointerCapture(e.pointerId);
    carousel.classList.add("reviews-section__carousel--grabbing");
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const carousel = carouselRef.current;
    if (!carousel) return;

    const dx = dragStartX.current - e.clientX;
    carousel.scrollLeft = dragStartScrollLeft.current + dx;
  }, []);

  const snapToClosestCard = useCallback((carousel: HTMLDivElement) => {
    const allCards = Array.from(
      carousel.querySelectorAll<HTMLElement>(".review-card"),
    );
    const closestIdx = findClosestCardIndex(carousel);
    if (closestIdx < 0 || closestIdx >= allCards.length) {
      isManualScrolling.current = false;
      return;
    }

    const targetCard = allCards[closestIdx];
    const offset =
      getCardCenter(targetCard) - getContainerCenter(carousel);

    if (Math.abs(offset) < 1) {
      isManualScrolling.current = false;
      setClosestIndex(closestIdx);
      return;
    }

    const onScrollEnd = () => {
      carousel.removeEventListener("scrollend", onScrollEnd);
      if (!isDragging.current) {
        isManualScrolling.current = false;
      }
      const idx = findClosestCardIndex(carousel);
      if (idx !== -1) setClosestIndex(idx);
    };

    carousel.addEventListener("scrollend", onScrollEnd, { once: true });
    carousel.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  const endDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.classList.remove("reviews-section__carousel--grabbing");
    isManualScrolling.current = true;
    snapToClosestCard(carousel);
  }, [snapToClosestCard]);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      endDrag();
      const carousel = carouselRef.current;
      if (carousel && carousel.hasPointerCapture(e.pointerId)) {
        carousel.releasePointerCapture(e.pointerId);
      }
    },
    [endDrag],
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent) => {
      endDrag();
      const carousel = carouselRef.current;
      if (carousel && carousel.hasPointerCapture(e.pointerId)) {
        carousel.releasePointerCapture(e.pointerId);
      }
    },
    [endDrag],
  );

  const scrollBy = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev" && !canScrollPrevious) return;
      if (direction === "next" && !canScrollNext) return;

      const carousel = carouselRef.current;
      if (!carousel) return;

      const allCards = Array.from(
        carousel.querySelectorAll<HTMLElement>(".review-card"),
      );
      if (allCards.length === 0) return;

      const currentIdx = findClosestCardIndex(carousel);
      if (currentIdx === -1) return;

      const targetIdx =
        direction === "next"
          ? Math.min(currentIdx + 1, allCards.length - 1)
          : Math.max(currentIdx - 1, 0);

      const targetCard = allCards[targetIdx];
      const offset =
        getCardCenter(targetCard) - getContainerCenter(carousel);
      carousel.scrollBy({ left: offset, behavior: "smooth" });
    },
    [canScrollNext, canScrollPrevious],
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScrollEnd = () => {
      if (isManualScrolling.current || isDragging.current) return;
      isManualScrolling.current = true;
      snapToClosestCard(carousel);
    };

    carousel.addEventListener("scrollend", handleScrollEnd);
    return () => carousel.removeEventListener("scrollend", handleScrollEnd);
  }, [snapToClosestCard]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || placeholderReviews.length <= 1) return;

    const allCards = Array.from(
      carousel.querySelectorAll<HTMLElement>(".review-card"),
    );
    const targetCard = allCards[1];
    const offset = getCardCenter(targetCard) - getContainerCenter(carousel);
    carousel.scrollBy({ left: offset, behavior: "instant" });
    setClosestIndex(1);
  }, []);

  return (
    <SectionContainer className="reviews-section" id="reviews" labelledBy="reviews-title">
      <div className="reviews-section__intro">
        <SectionHeading
          align="center"
          description="Hear from our many happy customers!"
          id="reviews-title"
          title="Customer feedback."
        />
      </div>

      <div className="reviews-section__carousel-wrapper">
        <button
          aria-label="Previous review"
          className="reviews-section__arrow reviews-section__arrow--prev"
          disabled={!canScrollPrevious}
          onClick={() => scrollBy("prev")}
          type="button"
        >
          <span aria-hidden="true" className="material-symbols-rounded">
            chevron_left
          </span>
        </button>

        <div
          className="reviews-section__carousel"
          ref={carouselRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {placeholderReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <button
          aria-label="Next review"
          className="reviews-section__arrow reviews-section__arrow--next"
          disabled={!canScrollNext}
          onClick={() => scrollBy("next")}
          type="button"
        >
          <span aria-hidden="true" className="material-symbols-rounded">
            chevron_right
          </span>
        </button>
      </div>
    </SectionContainer>
  );
}
