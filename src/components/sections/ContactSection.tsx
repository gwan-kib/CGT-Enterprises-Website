import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { business } from "../../data/business";
import { placeholderServices } from "../../data/services";
import {
  submitContactForm,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "../../utils/contactForm";
import { showToast } from "../../utils/toast";
import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";
import { FacebookIcon } from "../ui/FacebookIcon";
import { SectionHeading } from "../ui/SectionHeading";

type FormStatus = "error" | "idle" | "submitting" | "success";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  service: "",
  serviceOther: "",
  inquiryType: "",
  inquiryOther: "",
  message: "",
};

const ERROR_FIELD_BY_KEY: Record<keyof ContactFormValues, keyof ContactFormErrors | null> = {
  name: "name",
  email: "email",
  service: "serviceOther",
  serviceOther: "serviceOther",
  inquiryType: "inquiryOther",
  inquiryOther: "inquiryOther",
  message: "message",
};

const INVALID_FIELD_IDS: Record<keyof ContactFormErrors, string> = {
  name: "contact-name",
  email: "contact-email",
  serviceOther: "contact-service-other",
  inquiryOther: "contact-inquiry-other",
  message: "contact-message",
};

const INVALID_FIELD_ORDER: (keyof ContactFormErrors)[] = [
  "name",
  "email",
  "serviceOther",
  "inquiryOther",
  "message",
];

function withoutError(
  errors: ContactFormErrors,
  field: keyof ContactFormErrors | null,
): ContactFormErrors {
  if (!field || !(field in errors)) {
    return errors;
  }

  const next = { ...errors };
  delete next[field];
  return next;
}

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const submittingRef = useRef(false);

  useEffect(() => {
    function handleServiceSelect(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      setValues((prev) => ({ ...prev, service: detail, serviceOther: "" }));
      setErrors((prev) => withoutError(prev, "serviceOther"));
    }

    window.addEventListener("cgt:select-service", handleServiceSelect);
    return () =>
      window.removeEventListener("cgt:select-service", handleServiceSelect);
  }, []);

  const handleCopy = useCallback(
    async (field: "email" | "phone", text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        showToast(
          field === "phone" ? "Phone number copied." : "Email address copied.",
          "success",
        );
        setTimeout(() => setCopiedField(null), 1500);
      } catch {
        showToast("Couldn't copy. Please copy it manually.", "error");
      }
    },
    [],
  );

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => withoutError(prev, ERROR_FIELD_BY_KEY[field]));
  }

  function updateService(value: string) {
    setValues((prev) => ({
      ...prev,
      service: value,
      serviceOther: value === "other" ? prev.serviceOther : "",
    }));
    setErrors((prev) => withoutError(prev, "serviceOther"));
  }

  function updateInquiryType(value: string) {
    setValues((prev) => ({
      ...prev,
      inquiryType: value,
      inquiryOther: value === "other" ? prev.inquiryOther : "",
    }));
    setErrors((prev) => withoutError(prev, "inquiryOther"));
  }

  function focusFirstInvalid(nextErrors: ContactFormErrors) {
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

    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstInvalid(nextErrors);
      return;
    }

    setErrors({});
    submittingRef.current = true;
    setStatus("submitting");

    try {
      await submitContactForm(values);
      setValues(INITIAL_VALUES);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  let statusMessage = "";
  if (status === "submitting") {
    statusMessage = "Sending your message...";
  } else if (status === "success") {
    statusMessage = "Your message was sent successfully. We'll get back to you soon.";
  } else if (status === "error") {
    statusMessage = "We couldn't send your message. Please try again.";
  }

  return (
    <SectionContainer className="contact-section" id="contact" labelledBy="contact-title">
      <div className="contact-section__grid">
        <div className="contact-section__content">
          <SectionHeading
            description="Visit CGT Enterprises on Facebook!"
            id="contact-title"
            title="How can we help you?"
          />

          <a
            aria-label="Visit CGT Enterprises on Facebook"
            className="contact-section__facebook-link"
            href={business.social.facebook}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FacebookIcon className="contact-section__facebook-icon" />
          </a>

          <div className="contact-hours">
            <div className="contact-hours__row">
              <span aria-hidden="true" className="contact-card__icon material-symbols-rounded">
                timelapse
              </span>
              <span className="contact-card__label">Operational Hours</span>
            </div>
            <span className="contact-card__value">{business.hours}</span>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <button
                aria-label="Copy phone number"
                className={`contact-card__copy${copiedField === "phone" ? " contact-card__copy--copied" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy("phone", business.contact.phone);
                }}
                type="button"
              >
                <span aria-hidden="true" className="material-symbols-rounded">
                  {copiedField === "phone" ? "check" : "content_copy"}
                </span>
              </button>
              <a className="contact-card__link" href="tel:placeholder">
                <span aria-hidden="true" className="contact-card__icon material-symbols-rounded">
                  call
                </span>
                <div className="contact-card__content">
                  <span className="contact-card__value">{business.contact.phone}</span>
                </div>
                <span aria-hidden="true" className="contact-card__arrow material-symbols-rounded">
                  arrow_forward
                </span>
              </a>
            </div>

            <div className="contact-card">
              <button
                aria-label="Copy email address"
                className={`contact-card__copy${copiedField === "email" ? " contact-card__copy--copied" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy("email", business.contact.email);
                }}
                type="button"
              >
                <span aria-hidden="true" className="material-symbols-rounded">
                  {copiedField === "email" ? "check" : "content_copy"}
                </span>
              </button>
              <a className="contact-card__link" href="mailto:cgt@cgtenterprises.ca">
                <span aria-hidden="true" className="contact-card__icon material-symbols-rounded">
                  mail
                </span>
                <div className="contact-card__content">
                  <span className="contact-card__value">{business.contact.email}</span>
                </div>
                <span aria-hidden="true" className="contact-card__arrow material-symbols-rounded">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>

        <form
          aria-busy={status === "submitting"}
          className="static-form contact-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="static-form__row">
            <div className="static-field">
              <label className="static-field__label" htmlFor="contact-name">
                Name
              </label>
              <input
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                aria-invalid={errors.name ? true : undefined}
                autoComplete="name"
                className="static-field__control"
                id="contact-name"
                name="name"
                onChange={(e) => updateField("name", e.target.value)}
                type="text"
                value={values.name}
              />
              {errors.name && (
                <p className="contact-form__error" id="contact-name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="static-field">
              <label className="static-field__label" htmlFor="contact-email">
                Email
              </label>
              <input
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                aria-invalid={errors.email ? true : undefined}
                autoComplete="email"
                className="static-field__control"
                id="contact-email"
                name="email"
                onChange={(e) => updateField("email", e.target.value)}
                type="email"
                value={values.email}
              />
              {errors.email && (
                <p className="contact-form__error" id="contact-email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="static-form__row">
            <div className="static-field">
              <label className="static-field__label" htmlFor="contact-service">
                Service
              </label>
              <select
                className="static-form__select"
                id="contact-service"
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
              {values.service === "other" && (
                <>
                  <label className="static-field__label" htmlFor="contact-service-other">
                    Describe the service
                  </label>
                  <input
                    aria-describedby={
                      errors.serviceOther ? "contact-service-other-error" : undefined
                    }
                    aria-invalid={errors.serviceOther ? true : undefined}
                    className="static-field__control"
                    id="contact-service-other"
                    name="serviceOther"
                    onChange={(e) => updateField("serviceOther", e.target.value)}
                    type="text"
                    value={values.serviceOther}
                  />
                  {errors.serviceOther && (
                    <p className="contact-form__error" id="contact-service-other-error">
                      {errors.serviceOther}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="static-field">
              <label className="static-field__label" htmlFor="contact-inquiry-type">
                Inquiry type
              </label>
              <select
                className="static-form__select"
                id="contact-inquiry-type"
                name="inquiryType"
                onChange={(e) => updateInquiryType(e.target.value)}
                value={values.inquiryType}
              >
                <option value="">Select an inquiry...</option>
                <option value="question">Question</option>
                <option value="quote">Quote</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
              {values.inquiryType === "other" && (
                <>
                  <label className="static-field__label" htmlFor="contact-inquiry-other">
                    Describe the inquiry
                  </label>
                  <input
                    aria-describedby={
                      errors.inquiryOther ? "contact-inquiry-other-error" : undefined
                    }
                    aria-invalid={errors.inquiryOther ? true : undefined}
                    className="static-field__control"
                    id="contact-inquiry-other"
                    name="inquiryOther"
                    onChange={(e) => updateField("inquiryOther", e.target.value)}
                    type="text"
                    value={values.inquiryOther}
                  />
                  {errors.inquiryOther && (
                    <p className="contact-form__error" id="contact-inquiry-other-error">
                      {errors.inquiryOther}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="static-field">
            <label className="static-field__label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              aria-invalid={errors.message ? true : undefined}
              className="static-field__control static-field__control--textarea"
              id="contact-message"
              name="message"
              onChange={(e) => updateField("message", e.target.value)}
              rows={5}
              value={values.message}
            />
            {errors.message && (
              <p className="contact-form__error" id="contact-message-error">
                {errors.message}
              </p>
            )}
          </div>

          <Button disabled={status === "submitting"} type="submit">
            {status === "submitting" ? "Sending..." : "Send inquiry"}
            <span aria-hidden="true" className="contact-form__send-icon material-symbols-rounded">
              send
            </span>
          </Button>

          <p className="static-form__status" id="contact-form-status" role="status">
            {statusMessage}
          </p>
        </form>
      </div>
    </SectionContainer>
  );
}
