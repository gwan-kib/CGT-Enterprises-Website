import { useRef, useState, type FormEvent } from "react";
import { placeholderServices } from "../../data/services";
import {
  mapServerValidationErrors,
  submitReviewForm,
  validateReviewForm,
  type ReviewFormErrors,
  type ReviewFormValues,
} from "../../utils/reviewForm";
import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { StarIllustration } from "../ui/StarIllustration";

type FormStatus =
  | "duplicate"
  | "error"
  | "idle"
  | "submitting"
  | "success"
  | "validation-error";

const INITIAL_VALUES: ReviewFormValues = {
  service: "",
  rating: 0,
  summary: "",
  website: "",
};

const RATING_OPTIONS = [1, 2, 3, 4, 5];

const ERROR_FIELD_BY_KEY: Record<
  keyof ReviewFormValues,
  keyof ReviewFormErrors | null
> = {
  service: "service",
  rating: "rating",
  summary: "summary",
  website: null,
};

const INVALID_FIELD_IDS: Record<keyof ReviewFormErrors, string> = {
  service: "review-service",
  rating: "review-rating",
  summary: "review-summary",
};

const INVALID_FIELD_ORDER: (keyof ReviewFormErrors)[] = [
  "service",
  "rating",
  "summary",
];

function withoutError(
  errors: ReviewFormErrors,
  field: keyof ReviewFormErrors | null,
): ReviewFormErrors {
  if (!field || !(field in errors)) {
    return errors;
  }

  const next = { ...errors };
  delete next[field];
  return next;
}

export function ReviewFormSection() {
  const [values, setValues] = useState<ReviewFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ReviewFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const submittingRef = useRef(false);

  function updateField(field: keyof ReviewFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => withoutError(prev, ERROR_FIELD_BY_KEY[field]));
  }

  function updateService(value: string) {
    setValues((prev) => ({ ...prev, service: value }));
    setErrors((prev) => withoutError(prev, "service"));
  }

  function updateRating(value: number) {
    setValues((prev) => ({ ...prev, rating: value }));
    setErrors((prev) => withoutError(prev, "rating"));
  }

  function focusFirstInvalid(nextErrors: ReviewFormErrors) {
    const field = INVALID_FIELD_ORDER.find((key) => nextErrors[key]);
    if (!field) {
      return;
    }
    document.getElementById(INVALID_FIELD_IDS[field])?.focus();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submittingRef.current) {
      return;
    }

    const nextErrors = validateReviewForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstInvalid(nextErrors);
      return;
    }

    setErrors({});
    submittingRef.current = true;
    setStatus("submitting");

    try {
      const outcome = await submitReviewForm(values);

      if (outcome.status === "success") {
        setValues(INITIAL_VALUES);
        setStatus("success");
        return;
      }

      if (outcome.status === "validation-error") {
        const serverErrors = mapServerValidationErrors(outcome.details);
        if (Object.keys(serverErrors).length > 0) {
          setErrors(serverErrors);
          focusFirstInvalid(serverErrors);
          setStatus("idle");
          return;
        }
        setStatus("validation-error");
        return;
      }

      if (outcome.status === "duplicate") {
        setStatus("duplicate");
        return;
      }

      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  let statusMessage = "";
  if (status === "submitting") {
    statusMessage = "Sending your review...";
  } else if (status === "success") {
    statusMessage = "Thank you. Your review has been submitted for review.";
  } else if (status === "duplicate") {
    statusMessage = "It looks like this review was already submitted.";
  } else if (status === "validation-error") {
    statusMessage = "Please check your review and try again.";
  } else if (status === "error") {
    statusMessage = "We couldn't send your review. Please try again.";
  }

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
            description="Help us help you. Any and all feedback is greatly appreciated!"
            id="leave-review-title"
            title="Leave Us A Review!"
          />
          <StarIllustration />
        </div>

        <form
          aria-busy={status === "submitting"}
          className="static-form review-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="static-form__row">
            <div className="static-field">
              <label className="static-field__label" htmlFor="review-service">
                Service type
              </label>
              <select
                aria-describedby={errors.service ? "review-service-error" : undefined}
                aria-invalid={errors.service ? true : undefined}
                className="static-form__select"
                id="review-service"
                name="service"
                onChange={(e) => updateService(e.target.value)}
                value={values.service}
              >
                <option value="">Select a service...</option>
                {placeholderServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>
              {errors.service && (
                <p className="review-form__error" id="review-service-error">
                  {errors.service}
                </p>
              )}
            </div>

            <fieldset
              aria-invalid={errors.rating ? true : undefined}
              className="static-field review-form__rating-group"
            >
              <legend className="static-field__label">Rating</legend>
              <div
                aria-describedby={errors.rating ? "review-rating-error" : undefined}
                className="review-form__rating"
              >
                {RATING_OPTIONS.map((star) => (
                  <label className="review-form__rating-star" key={star}>
                    <input
                      aria-label={`${star} star${star === 1 ? "" : "s"}`}
                      checked={values.rating === star}
                      className="review-form__rating-input"
                      id={star === 1 ? "review-rating" : undefined}
                      name="rating"
                      onChange={() => updateRating(star)}
                      type="radio"
                      value={star}
                    />
                    <span aria-hidden="true" className="material-symbols-rounded">
                      star
                    </span>
                  </label>
                ))}
              </div>
              {errors.rating && (
                <p className="review-form__error" id="review-rating-error">
                  {errors.rating}
                </p>
              )}
            </fieldset>
          </div>

          <div className="static-field">
            <label className="static-field__label" htmlFor="review-summary">
              Summary
            </label>
            <textarea
              aria-describedby={errors.summary ? "review-summary-error" : undefined}
              aria-invalid={errors.summary ? true : undefined}
              className="static-field__control static-field__control--textarea"
              id="review-summary"
              name="summary"
              onChange={(e) => updateField("summary", e.target.value)}
              rows={5}
              value={values.summary}
            />
            {errors.summary && (
              <p className="review-form__error" id="review-summary-error">
                {errors.summary}
              </p>
            )}
          </div>

          <input
            aria-hidden="true"
            autoComplete="off"
            className="review-form__honeypot"
            name="website"
            onChange={(e) => updateField("website", e.target.value)}
            tabIndex={-1}
            type="text"
            value={values.website}
          />

          <Button disabled={status === "submitting"} type="submit">
            {status === "submitting" ? "Submitting..." : "Submit review"}
            <span aria-hidden="true" className="review-form__send-icon material-symbols-rounded">
              rate_review
            </span>
          </Button>

          <p className="static-form__status" id="review-form-status" role="status">
            {statusMessage}
          </p>
        </form>
      </div>
    </SectionContainer>
  );
}
