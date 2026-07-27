import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

export function PrivacyPolicyPage() {
  return (
    <>
      <Header homePath="/" />
      <main className="privacy-page" id="main-content">
        <article className="privacy-page__article">
          <p className="privacy-page__notice">
            Draft for client approval. Before publication, verify the final
            form fields, retention periods, review display fields, and
            cookie/analytics behaviour.
          </p>

          <h1 className="privacy-page__title">Privacy Policy</h1>
          <p className="privacy-page__last-updated">Last updated: Jul 25, 2026</p>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">1. Introduction</h2>
            <p>
              CGT Enterprises (&ldquo;CGT&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your privacy.
              This Privacy Policy explains how CGT collects, uses, stores, and
              discloses personal information when you visit cgtenterprises.ca,
              contact CGT through the website, or submit a customer review.
            </p>
            <p>
              By using the website or submitting information through a form,
              you acknowledge the practices described in this policy.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              2. Information We Collect
            </h2>
            <p>
              <strong>Contact inquiries.</strong> When you use the contact
              form, we collect the information you choose to provide. This may
              include your name, email address, phone number, message, and
              details about the service you are asking about.
            </p>
            <p>
              <strong>Review submissions.</strong> When you submit a review,
              the form may collect the service type, review summary, service
              date, and any identifying or contact information shown in the
              final review form. Please do not include sensitive personal
              information or information about another person unless you are
              authorized to provide it.
            </p>
            <p>
              <strong>Technical information.</strong> CGT&rsquo;s hosting and
              connected service providers may automatically process limited
              technical information needed to operate and protect the website,
              such as an IP address, browser or device information, request
              logs, and security-related data.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              3. How We Use Personal Information
            </h2>
            <p>CGT may use personal information to:</p>
            <ul className="privacy-page__list">
              <li>respond to questions, service inquiries, and requests;</li>
              <li>communicate about a submitted inquiry;</li>
              <li>
                review, moderate, store, and, where permission has been
                provided, publish customer reviews;
              </li>
              <li>
                operate, maintain, secure, and troubleshoot the website and its
                connected systems;
              </li>
              <li>
                prevent spam, misuse, fraud, or other harmful activity; and
              </li>
              <li>
                meet legal, regulatory, accounting, or record-keeping
                obligations.
              </li>
            </ul>
            <p>
              CGT does not sell or rent personal information. CGT will not use
              form submissions for unrelated marketing unless the individual has
              separately consented.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              4. Consent and Choices
            </h2>
            <p>
              CGT collects, uses, and discloses personal information with
              consent or as otherwise permitted by law. Consent may be express
              or implied depending on the circumstances and the sensitivity of
              the information.
            </p>
            <p>
              Submitting a contact form authorizes CGT to use the submitted
              information to respond to and manage the inquiry. A review will
              only be displayed publicly where the submission process clearly
              indicates that publication is intended and the reviewer provides
              the required permission.
            </p>
            <p>
              You may withdraw consent for future use, subject to legal,
              contractual, and operational restrictions. Withdrawal may prevent
              CGT from continuing to respond to a request or display a
              submitted review.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              5. Service Providers and Disclosure
            </h2>
            <p>
              CGT may share or allow access to personal information only where
              reasonably necessary for the purposes described in this policy,
              including with:
            </p>
            <ul className="privacy-page__list">
              <li>Google Apps Script for form processing and email delivery;</li>
              <li>Google Sheets for approved review-submission storage;</li>
              <li>
                Google services used to receive or manage business
                communications;
              </li>
              <li>
                Render or another approved hosting provider used to operate the
                website; and
              </li>
              <li>
                professional advisers, authorities, or other parties where
                disclosure is required or permitted by law.
              </li>
            </ul>
            <p>
              These service providers may process information outside the
              Northwest Territories or outside Canada. Information processed in
              another jurisdiction may be subject to that jurisdiction&rsquo;s
              laws. CGT remains responsible for personal information under its
              control and will use reasonable measures to require appropriate
              handling by its service providers.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">6. Public Reviews</h2>
            <p>
              A review submitted for publication may be visible to anyone who
              visits the website. Depending on the approved review form, the
              published review may include the review text, service type,
              service date, and the reviewer&rsquo;s name or other approved
              display information.
            </p>
            <p>
              CGT may review, decline, remove, or make limited formatting edits
              to submissions for relevance, privacy, safety, clarity, or
              compliance with the review-submission rules. CGT will not
              intentionally publish private contact information as part of a
              review unless the reviewer has clearly requested and authorized
              it.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">7. Retention</h2>
            <p>
              CGT keeps personal information only for as long as reasonably
              necessary to fulfill the purposes described in this policy and to
              meet legal, accounting, security, dispute-resolution, and
              legitimate business requirements.
            </p>
            <p>
              Contact inquiries may be retained while the inquiry is active and
              for a reasonable period afterward. Review submissions may be
              retained while they are published and for reasonable moderation
              or record-keeping purposes. Information that is no longer
              required will be deleted, anonymized, or securely disposed of
              where reasonably possible.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">8. Safeguards</h2>
            <p>
              CGT uses reasonable administrative, technical, and organizational
              safeguards appropriate to the sensitivity of the information.
              These measures may include restricted account access,
              client-controlled service accounts, access permissions,
              validation, spam controls, and secure service configuration.
            </p>
            <p>
              No method of transmission or storage is completely secure. CGT
              cannot guarantee absolute security, but will take reasonable
              steps to reduce the risk of unauthorized access, use, disclosure,
              alteration, or loss.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              9. Access, Correction, and Deletion Requests
            </h2>
            <p>
              You may ask CGT to provide access to personal information it
              holds about you, correct inaccurate information, or delete
              information that is no longer required, subject to applicable
              legal exceptions.
            </p>
            <p>
              CGT may need to verify your identity before completing a request.
              Requests can be sent using the contact information below.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              10. Cookies and Similar Technologies
            </h2>
            <p>
              CGT does not use personal information for targeted advertising.
              The website may use technologies that are strictly necessary to
              operate, secure, or deliver the website and its forms.
            </p>
            <p>
              If CGT later adds analytics, advertising, or other non-essential
              tracking technologies, CGT will update this policy and implement
              any notice or consent controls required by applicable law.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              11. Third-Party Links
            </h2>
            <p>
              The website may contain links to third-party websites or
              services, including Google Reviews, Google Business Profile, and
              Facebook. CGT does not control those third parties and is not
              responsible for their privacy practices. Review the privacy
              policy of the relevant third party before providing information
              to it.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              12. Changes to This Policy
            </h2>
            <p>
              CGT may update this Privacy Policy when website features, service
              providers, legal requirements, or information-handling practices
              change. The revised policy will be posted with an updated
              &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section className="privacy-page__section">
            <h2 className="privacy-page__section-title">
              13. Contact CGT
            </h2>
            <p>
              Questions, concerns, complaints, or requests relating to this
              Privacy Policy or CGT&rsquo;s handling of personal information
              can be directed to:
            </p>
            <address className="privacy-page__address">
              <p>CGT Enterprises</p>
              <p>Yellowknife, Northwest Territories</p>
              <p>
                Email:{' '}
                <a href="mailto:cgt@cgtenterprises.ca">cgt@cgtenterprises.ca</a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+18674455883">(867) 445-5883</a>
              </p>
            </address>
            <p>
              CGT will review privacy concerns and respond as required by
              applicable Canadian privacy law.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
