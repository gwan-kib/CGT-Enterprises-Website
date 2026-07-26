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
            <div className="contact-card">
              <span aria-hidden="true" className="contact-card__icon material-symbols-rounded">
                timelapse
              </span>
              <div className="contact-card__content">
                <span className="contact-card__label">Operational Hours</span>
                <span className="contact-card__value">
                  Mon - Fri: 3 PM - 6 PM | Sat - Sun: 10 AM - 4 PM
                </span>
              </div>
            </div>
            <a className="contact-card contact-card--clickable" href="tel:placeholder">
              <span aria-hidden="true" className="contact-card__icon material-symbols-rounded">
                call
              </span>
              <div className="contact-card__content">
                <span className="contact-card__label">Give Us A Call</span>
                <span className="contact-card__value">{business.contact.phone}</span>
              </div>
              <span aria-hidden="true" className="contact-card__arrow material-symbols-rounded">
                arrow_forward
              </span>
            </a>

            <a className="contact-card contact-card--clickable" href="mailto:cgt@cgtenterprises.ca">
              <span aria-hidden="true" className="contact-card__icon material-symbols-rounded">
                mail
              </span>
              <div className="contact-card__content">
                <span className="contact-card__label">Send An Email</span>
                <span className="contact-card__value">{business.contact.email}</span>
              </div>
              <span aria-hidden="true" className="contact-card__arrow material-symbols-rounded">
                arrow_forward
              </span>
            </a>
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
  )
}
