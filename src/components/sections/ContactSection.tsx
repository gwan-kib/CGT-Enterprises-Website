import { useCallback, useEffect, useState } from "react";
import { business } from "../../data/business";
import { placeholderServices } from "../../data/services";
import { showToast } from "../../utils/toast";
import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";
import { FacebookIcon } from "../ui/FacebookIcon";
import { SectionHeading } from "../ui/SectionHeading";
import { StaticField } from "../ui/StaticField";

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [inquiryType, setInquiryType] = useState("");

  useEffect(() => {
    function handleServiceSelect(e: Event) {
      setSelectedService((e as CustomEvent<string>).detail);
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

  return (
    <SectionContainer className="contact-section" id="contact" labelledBy="contact-title">
      <div className="contact-section__grid">
        <div className="contact-section__content">
          <SectionHeading
            description="Visit CGT Enterprises on Facebook"
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

        <form aria-describedby="contact-form-status" className="static-form contact-form">
          <div className="static-form__row">
            <StaticField id="contact-name" label="Name" />
            <StaticField id="contact-email" label="Email" />
          </div>
          <div className="static-form__row">
            <div className="static-field">
              <label className="static-field__label" htmlFor="contact-service">
                Service
              </label>
              <select
                className="static-form__select"
                id="contact-service"
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
              <label className="static-field__label" htmlFor="contact-inquiry-type">
                Inquiry type
              </label>
              <select
                className="static-form__select"
                id="contact-inquiry-type"
                onChange={(e) => setInquiryType(e.target.value)}
                value={inquiryType}
              >
                <option value="">Select an inquiry...</option>
                <option value="question">Question</option>
                <option value="quote">Quote</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
              {inquiryType === "other" && (
                <input
                  className="static-field__control"
                  placeholder="Describe the inquiry"
                  readOnly
                  type="text"
                />
              )}
            </div>
          </div>
          <StaticField id="contact-message" label="Message" multiline />
          <Button disabled>
            Send inquiry
            <span aria-hidden="true" className="contact-form__send-icon material-symbols-rounded">
              send
            </span>
          </Button>
          <p className="static-form__status" id="contact-form-status">
            Visual placeholder only. Contact submission is not connected.
          </p>
        </form>
      </div>
    </SectionContainer>
  );
}
