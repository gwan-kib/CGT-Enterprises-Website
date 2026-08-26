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

type FormStatus = "error" | "idle" | "submitting" | "success";

const INITIAL_VALUES: ReviewFormValues = {
  service: "",
  serviceOther: "",
  summary: "",
  date: "",
};

const ERROR_FIELD_BY_KEY: Record<keyof ReviewFormValues, keyof ReviewFormErrors | null> = {
  service: "service",
  serviceOther: "serviceOther",
  summary: "summary",
  date: "date",
};

const INVALID_FIELD_IDS: Record<keyof ReviewFormErrors, string> = {
  service: "review-service",
  serviceOther: "review-service-other",
  summary: "review-summary",
  date: "review-date",
};

const INVALID_FIELD_ORDER: (keyof ReviewFormErrors)[] = [
  "service",
  "serviceOther",
  "summary",
  "date",
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
    setValues((prev) => ({
      ...prev,
      service: value,
      serviceOther: value === "other" ? prev.serviceOther : "",
    }));
    setErrors((prev) => withoutError(withoutError(prev, "service"), "serviceOther"));
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
    statusMessage = "Thank you! Your review has been submitted for CGT to review.";
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
              {values.service === "other" && (
                <>
                  <label className="static-field__label" htmlFor="review-service-other">
                    Describe the service
                  </label>
                  <input
                    aria-describedby={
                      errors.serviceOther ? "review-service-other-error" : undefined
                    }
                    aria-invalid={errors.serviceOther ? true : undefined}
                    className="static-field__control"
                    id="review-service-other"
                    name="serviceOther"
                    onChange={(e) => updateField("serviceOther", e.target.value)}
                    type="text"
                    value={values.serviceOther}
                  />
                  {errors.serviceOther && (
                    <p className="review-form__error" id="review-service-other-error">
                      {errors.serviceOther}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="static-field">
              <label className="static-field__label" htmlFor="review-date">
                Date
              </label>
              <input
                aria-describedby={errors.date ? "review-date-error" : undefined}
                aria-invalid={errors.date ? true : undefined}
                className="static-field__control"
                id="review-date"
                name="date"
                onChange={(e) => updateField("date", e.target.value)}
                type="date"
                value={values.date}
              />
              {errors.date && (
                <p className="review-form__error" id="review-date-error">
                  {errors.date}
                </p>
              )}
            </div>
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
