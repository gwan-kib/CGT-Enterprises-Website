import { useCallback, useEffect, useRef, useState } from "react";
import { formatReviewDate, loadReviews } from "../../utils/reviews";
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

export function ReviewsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<ReviewCardData[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [closestIndex, setClosestIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    loadReviews(controller.signal).then((loadedReviews) => {
      if (controller.signal.aborted) return;
      setClosestIndex(0);
      setReviews(loadedReviews.map((review): ReviewCardData => ({
        id: review.id,
        date: formatReviewDate(review.date),
        detail: review.service,
        quote: review.summary,
        rating: review.rating,
      })));
      setStatus("success");
    }).catch(() => {
      if (!controller.signal.aborted) setStatus("error");
    });
    return () => controller.abort();
  }, []);

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const isManualScrolling = useRef(false);

  const totalCards = reviews.length;
  const currentIndex = Math.max(0, Math.min(closestIndex, totalCards - 1));
  const canScrollPrevious = totalCards > 1 && currentIndex > 0;
  const canScrollNext = totalCards > 1 && currentIndex < totalCards - 1;

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
    if (!carousel) return;
    isDragging.current = false;
    isManualScrolling.current = false;
    carousel.classList.remove("reviews-section__carousel--grabbing");
    if (reviews.length === 0) return;

    const allCards = Array.from(
      carousel.querySelectorAll<HTMLElement>(".review-card"),
    );
    const initialIndex = reviews.length > 1 ? 1 : 0;
    const targetCard = allCards[initialIndex];
    if (!targetCard) return;
    const offset = getCardCenter(targetCard) - getContainerCenter(carousel);
    carousel.scrollBy({ left: offset, behavior: "instant" });
    const frame = requestAnimationFrame(() => {
      setClosestIndex(Math.max(0, findClosestCardIndex(carousel)));
    });
    return () => cancelAnimationFrame(frame);
  }, [reviews]);

  return (
    <SectionContainer className="reviews-section" id="reviews" labelledBy="reviews-title" tone="brand">
      <div className="reviews-section__intro">
        <SectionHeading
          align="center"
          description="Hear from our many happy customers!"
          id="reviews-title"
          title="Customer feedback."
        />
      </div>

      <div className="reviews-section__carousel-wrapper">
        <span aria-hidden="true" className="reviews-section__circle reviews-section__circle--start" />
        <span aria-hidden="true" className="reviews-section__circle reviews-section__circle--end" />

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
          className={`reviews-section__carousel${reviews.length <= 1 ? " reviews-section__carousel--single" : ""}`}
          ref={carouselRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {reviews.length === 0 && (
            <p className="reviews-section__status" role={status === "loading" ? "status" : undefined}>
              {status === "loading"
                ? "Loading customer reviews..."
                : status === "error"
                  ? "Customer reviews are temporarily unavailable."
                  : "No customer reviews are currently published."}
            </p>
          )}
          {reviews.map((review) => (
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
