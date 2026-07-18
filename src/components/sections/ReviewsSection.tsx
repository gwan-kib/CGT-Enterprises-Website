import { SectionContainer } from '../layout/SectionContainer'
import { SectionHeading } from '../ui/SectionHeading'

const placeholderReviews = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed erat vitae sem tempor tincidunt.',
    name: 'Customer name',
    detail: 'Service placeholder',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed erat vitae sem tempor tincidunt.',
    name: 'Customer name',
    detail: 'Service placeholder',
  },
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed erat vitae sem tempor tincidunt.',
    name: 'Customer name',
    detail: 'Service placeholder',
  },
]

export function ReviewsSection() {
  return (
    <SectionContainer id="reviews" labelledBy="reviews-title">
      <div className="reviews-section__intro">
        <SectionHeading
          align="center"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. These cards show the intended review hierarchy only."
          eyebrow="(03) Customer reviews"
          id="reviews-title"
          title="Customer feedback will live here."
        />
      </div>

      <div className="reviews-section__grid">
        {placeholderReviews.map((review, index) => (
          <blockquote className="review-card" key={index}>
            <p className="review-card__quote">&ldquo;{review.quote}&rdquo;</p>
            <footer className="review-card__footer">
              <cite>{review.name}</cite>
              <span>{review.detail}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionContainer>
  )
}
