import { business } from '../../data/business'
import { FacebookIcon } from '../ui/FacebookIcon'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__upper">
          <div className="site-footer__brand">
            <div className="site-footer__brand-text">
              <span className="site-footer__brand-name">{business.name}</span>
              <span className="site-footer__brand-hours">{business.hours}</span>
            </div>
          </div>
          <div className="site-footer__contact">
            <a
              className="site-footer__contact-link"
              href={`tel:${business.contact.phone.replace(/\D/g, '')}`}
            >
              <span
                aria-hidden="true"
                className="site-footer__contact-icon material-symbols-rounded"
              >
                call
              </span>
              {business.contact.phone}
            </a>
            <a
              className="site-footer__contact-link"
              href={`mailto:${business.contact.email}`}
            >
              <span
                aria-hidden="true"
                className="site-footer__contact-icon material-symbols-rounded"
              >
                mail
              </span>
              {business.contact.email}
            </a>
            <a
              aria-label="Visit CGT Enterprises on Facebook"
              className="site-footer__social-link"
              href={business.social.facebook}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FacebookIcon className="site-footer__social-icon" />
            </a>
          </div>
        </div>

        <div className="site-footer__lower">
          <small className="site-footer__copyright">
            &copy; {currentYear} {business.name}. All rights reserved.
          </small>
          <a className="site-footer__legal-link" href="/privacy-policy.html">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
