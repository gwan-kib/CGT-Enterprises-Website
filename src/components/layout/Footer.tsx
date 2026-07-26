import { business } from '../../data/business'

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="site-footer__social-icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__upper">
          <div className="site-footer__brand">
            <span className="site-footer__brand-name">{business.name}</span>
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
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div className="site-footer__lower">
          <small className="site-footer__copyright">
            &copy; {currentYear} {business.name}. All rights reserved.
          </small>
          {/*
            Temporary placeholder destination.
            Replace with the approved Privacy Policy URL or route once implemented.
          */}
          <a className="site-footer__legal-link" href="#privacy">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
