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

  const totalCards = placeholderReviews.length;
  const canScrollPrevious = closestIndex > 0;
  const canScrollNext = closestIndex < totalCards - 1;

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
      const idx = findClosestCardIndex(carousel);
      if (idx !== -1) setClosestIndex(idx);
    };

    carousel.addEventListener("scrollend", handleScrollEnd);
    return () => carousel.removeEventListener("scrollend", handleScrollEnd);
  }, []);

  return (
    <SectionContainer id="reviews" labelledBy="reviews-title">
      <div className="reviews-section__intro">
        <SectionHeading
          align="center"
          description="Hear from our many happy customers!"
          eyebrow="(03) Reviews"
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

        <div className="reviews-section__carousel" ref={carouselRef}>
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
