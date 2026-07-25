import { business } from '../../data/business'
import { SectionContainer } from '../layout/SectionContainer'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { StaticField } from '../ui/StaticField'

export function ContactSection() {
  return (
    <SectionContainer
      className="contact-section"
      id="contact"
      labelledBy="contact-title"
      tone="brand"
    >
      <div className="contact-section__grid">
        <div className="contact-section__content">
          <SectionHeading
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. This area establishes the future contact hierarchy without publishing unconfirmed details."
            eyebrow="(06) Contact"
            id="contact-title"
            title="A direct next step belongs here."
          />

          <div className="contact-cards">
            <a className="contact-card contact-card--clickable" href="tel:placeholder">
              <span aria-hidden="true" className="contact-card__icon material-symbols-outlined">
                call
              </span>
              <div className="contact-card__content">
                <span className="contact-card__label">Phone</span>
                <span className="contact-card__value">{business.contact.phone}</span>
              </div>
              <span aria-hidden="true" className="contact-card__arrow material-symbols-outlined">
                arrow_forward
              </span>
            </a>

            <a className="contact-card contact-card--clickable" href="mailto:placeholder">
              <span aria-hidden="true" className="contact-card__icon material-symbols-outlined">
                mail
              </span>
              <div className="contact-card__content">
                <span className="contact-card__label">Email</span>
                <span className="contact-card__value">{business.contact.email}</span>
              </div>
              <span aria-hidden="true" className="contact-card__arrow material-symbols-outlined">
                arrow_forward
              </span>
            </a>

            <div className="contact-card">
              <span aria-hidden="true" className="contact-card__icon material-symbols-outlined">
                location_on
              </span>
              <div className="contact-card__content">
                <span className="contact-card__label">Location</span>
                <span className="contact-card__value">{business.contact.location}</span>
              </div>
            </div>
          </div>

          <div className="contact-info-card">
            <h3 className="contact-info-card__heading">Hours</h3>
            <p className="contact-info-card__text">
              Mon - Fri: 3 PM - 6 PM | Sat - Sun: 10 AM - 4 PM
            </p>
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
            <span aria-hidden="true" className="contact-form__send-icon material-symbols-outlined">
              send
            </span>
          </Button>
          <p className="static-form__status" id="contact-form-status">
            Visual placeholder only. Contact submission is not connected.
          </p>
        </form>
      </div>
    </SectionContainer>
  )
}
