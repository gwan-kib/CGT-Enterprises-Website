export interface ReviewCardData {
  date: string;
  detail: string;
  id: string;
  quote: string;
  rating: number;
}

interface ReviewCardProps {
  review: ReviewCardData;
}

const TOTAL_STARS = 5;

export function ReviewCard({ review }: ReviewCardProps) {
  const filledColor = "#FFA800";
  const emptyColor = "#D8D8D8";

  return (
    <article className="review-card">
      <div className="review-card__stars" aria-label={`${review.rating} out of ${TOTAL_STARS} stars`}>
        {Array.from({ length: TOTAL_STARS }, (_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="material-symbols-rounded"
            style={{ color: i < review.rating ? filledColor : emptyColor }}
          >
            star
          </span>
        ))}
      </div>

      <blockquote className="review-card__quote">
        <p>{review.quote}</p>
      </blockquote>

      <span className="review-card__detail">Service: {review.detail}</span>
      <time className="review-card__date">{review.date}</time>
    </article>
  );
}
