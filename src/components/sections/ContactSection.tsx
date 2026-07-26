import { useCallback, useState } from "react";
import { business } from "../../data/business";
import { SectionContainer } from "../layout/SectionContainer";
import { Button } from "../ui/Button";
import { FacebookIcon } from "../ui/FacebookIcon";
import { SectionHeading } from "../ui/SectionHeading";
import { StaticField } from "../ui/StaticField";

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = useCallback(async (field: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  return (
    <SectionContainer className="contact-section" id="contact" labelledBy="contact-title" tone="brand">
      <div className="contact-section__grid">
        <div className="contact-section__content">
          <SectionHeading
            description="Visit CGT Enterprises on Facebook"
            eyebrow="(06) Contact"
            id="contact-title"
            title="What do you need to know?"
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
            <span className="contact-card__value">Mon - Fri: 3 PM - 6 PM | Sat - Sun: 10 AM - 4 PM</span>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
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
              <button
                aria-label="Copy phone number"
                className="contact-card__copy"
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
            </div>

            <div className="contact-card">
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
              <button
                aria-label="Copy email address"
                className="contact-card__copy"
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
            </div>
          </div>
        </div>

        <form aria-describedby="contact-form-status" className="static-form contact-form">
          <div className="static-form__row">
            <StaticField id="contact-name" label="Name" />
            <StaticField id="contact-email" label="Email" />
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
