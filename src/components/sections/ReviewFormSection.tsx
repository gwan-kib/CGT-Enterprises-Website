import { SectionContainer } from '../layout/SectionContainer'
import { Button } from '../ui/Button'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { SectionHeading } from '../ui/SectionHeading'
import { StaticField } from '../ui/StaticField'

export function ReviewFormSection() {
  return (
    <SectionContainer
      className="review-form-section"
      id="leave-review"
      labelledBy="leave-review-title"
      tone="dark"
    >
      <div className="review-form-section__grid">
        <div className="review-form-section__content">
          <SectionHeading
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. This form is a visual placeholder and does not collect or submit information."
            eyebrow="(04) Leave a review"
            id="leave-review-title"
            title="A simple space for future feedback."
          />
          <ImagePlaceholder ratio="landscape" />
        </div>

        <form
          aria-describedby="review-form-status"
          className="static-form static-form--inverse"
        >
          <div className="static-form__row">
            <StaticField id="review-name" label="Name" />
            <StaticField id="review-email" label="Email" />
          </div>
          <StaticField id="review-message" label="Review" multiline />
          <Button disabled>Submit review</Button>
          <p className="static-form__status" id="review-form-status">
            Visual placeholder only. Review submission is not connected.
          </p>
        </form>
      </div>
    </SectionContainer>
  )
}
