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

          <dl className="contact-section__details">
            <div>
              <dt>Phone</dt>
              <dd>{business.contact.phone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{business.contact.email}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{business.contact.location}</dd>
            </div>
          </dl>
        </div>

        <form aria-describedby="contact-form-status" className="static-form">
          <div className="static-form__row">
            <StaticField id="contact-name" label="Name" />
            <StaticField id="contact-email" label="Email" />
          </div>
          <StaticField id="contact-message" label="Message" multiline />
          <Button disabled>Send enquiry</Button>
          <p className="static-form__status" id="contact-form-status">
            Visual placeholder only. Contact submission is not connected.
          </p>
        </form>
      </div>
    </SectionContainer>
  )
}
