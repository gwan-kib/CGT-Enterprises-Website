import { useState } from "react";
import { placeholderServices } from "../../data/services";
import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { StarIllustration } from "../ui/StarIllustration";
import { StaticField } from "../ui/StaticField";

export function ReviewFormSection() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedService, setSelectedService] = useState("");

  const displayRating = hoveredRating || rating;

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
            id="leave-review-title"
            title="A simple space for future feedback."
          />
          <StarIllustration />
        </div>

        <form
          aria-describedby="review-form-status"
          className="static-form review-form"
        >
          <div className="static-form__row">
            <div className="static-field">
              <label className="static-field__label" htmlFor="review-service">
                Service received
              </label>
              <select
                className="review-form__service-select"
                id="review-service"
                onChange={(e) => setSelectedService(e.target.value)}
                value={selectedService}
              >
                <option value="">Select a service...</option>
                {placeholderServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {selectedService === "other" && (
                <input
                  className="static-field__control"
                  placeholder="Describe the service"
                  readOnly
                  type="text"
                />
              )}
            </div>

            <div className="static-field">
              <span className="static-field__label" id="review-rating-label">
                Rating
              </span>
              <div
                aria-labelledby="review-rating-label"
                className="review-form__rating"
                role="radiogroup"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    aria-checked={rating === star}
                    aria-label={`${star} star${star !== 1 ? "s" : ""}`}
                    className={`review-form__rating-star${star <= displayRating ? " review-form__rating-star--active" : ""}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    role="radio"
                    type="button"
                  >
                    <span aria-hidden="true" className="material-symbols-rounded">
                      star
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="static-form__row">
            <StaticField id="review-name" label="Name" />
            <StaticField id="review-email" label="Email" />
          </div>
          <StaticField id="review-message" label="Review" multiline />
          <Button disabled>
            Submit review
            <span aria-hidden="true" className="review-form__send-icon material-symbols-rounded">
              rate_review
            </span>
          </Button>
          <p className="static-form__status" id="review-form-status">
            Visual placeholder only. Review submission is not connected.
          </p>
        </form>
      </div>
    </SectionContainer>
  );
}
