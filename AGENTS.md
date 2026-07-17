# CGT Enterprises Website Agent Instructions

The main goal is to help the developer complete and hand off a clear, professional, maintainable small-business website for CGT Enterprises without expanding the approved scope.

## Behaviour

- Be concise, direct, and practical for a solo developer.
- Explain the purpose of a change before and after writing code.
- Inspect the current repository before proposing files, commands, libraries, or architecture.
- Work in small, reviewable changes and do not continue into a new phase unless asked.
- Preserve working code and established patterns unless a change improves correctness, accessibility, responsiveness, performance, or maintainability.
- Do not refactor unrelated code or generate large files without approval.
- When reviewing code, identify the exact flaw, explain its effect, and give focused guidance. Provide a full rewrite only when requested.
- Clearly identify assumptions, placeholders, missing client content, and decisions that still require confirmation.

## Sources of truth

Use these sources in order:

1. The local repository
2. The [Approved CGT Website Proposal](https://docs.google.com/document/d/1Rj6ip0YLZgy_VFChw8bOHYwQTusAj1OfCwuPJ4yQlts/edit?tab=t.qzsadbfy4wjr)
3. The completed [Client Website Information Checklist](https://docs.google.com/document/d/1Rj6ip0YLZgy_VFChw8bOHYwQTusAj1OfCwuPJ4yQlts/edit?tab=t.xed2j6fyjtdf)
4. The [Current CGT website](https://cgtenterprises.ca/)
5. The [Remote Repository](https://github.com/gwan-kib/CGT-Enterprises-Website)

- Product intent comes from the proposal and confirmed client decisions; implementation details come from the current repository.
- Never expand the project beyond the approved scope.
- Do not treat ideas, unanswered checklist items, optional features, or design suggestions as approved requirements. Clearly identify any such items as pending, optional, or requiring client approval.
- If sources conflict, flag the conflict and ask the developer which decision should dictate your actions before you proceed.
- Do not invent services, prices, qualifications, guarantees, testimonials, statistics, business history, service areas, or legal claims.

## Technology stack and service responsibilities

The expected production stack is:

- **React:** Build the public-facing, primarily one-page website and its reusable sections, forms, navigation, and interactive UI.
- **TypeScript:** Use TypeScript for all React application source code. Write components in `.tsx` files and non-JSX application modules in `.ts` files. Do not create JavaScript application files unless a specific tool or external platform requires them and the reason is documented.
- **Tailwind CSS:** Implement the responsive layout, CGT design tokens, typography, spacing, states, and component styling.
- **Render:** Build and host the production React website. Use a preview or staging deployment before the custom domain points to it.
- **Porkbun:** Register or manage the custom domain and DNS records that connect the CGT domain to Render. Do not treat Porkbun as the website host.
- **Google Apps Script:** Provide the server-side endpoint for the contact form, including validation, submission handling, and delivery to the client-designated email. It is also the expected bridge for writing approved review-form submissions to Google Sheets if that workflow is implemented.
- **Google Sheets:** Store reviews submitted through the website. Define the final columns, moderation process, permissions, and client ownership before connecting production submissions. Do not use Sheets as a general application database.
- **Google Business Profile and Google Reviews:** Provide the outbound Leave a Google Review destination and, if approved, the source for displaying existing public reviews. The access method and display integration must be confirmed; do not scrape reviews or invent an unsupported API.

Service boundaries:

- Keep the React application static and client-facing; do not introduce a separate backend framework unless an approved requirement cannot be handled safely by Apps Script.
- Keep application types explicit, avoid `any`, and validate or narrow data received from forms and external services.
- JavaScript is acceptable only for configuration, build tooling, or platform-specific files that cannot reasonably use TypeScript, including native Google Apps Script files when required.
- Keep secrets, privileged Google credentials, email-delivery logic, and Sheet-write permissions out of frontend code.
- Ask before replacing any planned technology or service, changing its responsibility, or adding a production dependency.

## Approved product direction

- Build a primarily one-page CGT Enterprises website.
- Design and test the website for two target layouts only: a 16:9 laptop/desktop display and a 1170 × 2532 mobile display. Support for additional screen sizes or device formats is outside the project scope.
- Keep branding, typography, spacing, buttons, cards, imagery, and calls to action consistent.
- Keep the result simple to maintain after handoff.

## Planned page structure

Use this as the default one-page structure unless a confirmed revision changes it:

1. Header and anchor navigation.
2. About.
3. Services and prices, presented as responsive cards.
4. Customer reviews or testimonials, if the display source and permissions are confirmed.
5. Leave-a-review section, if the submission workflow is confirmed.
6. FAQ with approximately 5-10 approved questions and answers.
7. Contact section and contact form.
8. Footer.

- Organize components by visible page section and create small shared components only for genuinely repeated patterns such as buttons, section headings, cards, fields, and layout containers.

Refer to the [Client Website Information Checklist](https://docs.google.com/document/d/1Rj6ip0YLZgy_VFChw8bOHYwQTusAj1OfCwuPJ4yQlts/edit?tab=t.xed2j6fyjtdf) for current business details, contact information, hours, services, links, content, and other client-provided requirements. Do not duplicate or assume those details in this file; verify them against the checklist and later confirmed client decisions before implementation or launch.

## Design system

- Keep the visual style modern, professional, simple, straightforward, and friendly to a broad local audience.
- Define reusable tokens for brand colours, text and background colours, typography, spacing, radii, shadows, content widths, controls, and responsive breakpoints.
- Use one consistent design system across all sections.
- Prioritize readable type, strong hierarchy, sufficient contrast, controlled spacing, consistent alignment, clear buttons, professional imagery, and a polished mobile layout.
- Avoid excessive gradients, animation, glass effects, decorative clutter, or crowded layouts unless they support an approved direction.
- Add subtle, consistent transitions for hover, focus, selected, menu, accordion, carousel, and validation states. Respect `prefers-reduced-motion`.

## Responsive implementation

- Build desktop-first where practical.
- Test large phones, tablets and standard laptops.
- Ensure navigation remains usable, content does not overflow, cards stack cleanly, images crop intentionally, controls remain easy to tap, forms fit the viewport, and sections do not gain excessive empty space.

- Prefer fluid layouts, flexible grids, and appropriate min/max constraints over fixed dimensions.
- If a service carousel is used, provide keyboard controls, touch support, visible controls, understandable position state, and a usable non-carousel layout where appropriate.

## Accessibility

- Use semantic HTML and native controls.
- Use descriptive links and button labels rather than generic click-here text.
- Associate every form field with a visible label and expose validation errors programmatically.
- Make navigation, menus, accordions, carousels, forms, and dialogs fully keyboard accessible with visible focus states.
- Provide meaningful alternative text for informative images and empty alternative text for decorative images.
- Meet appropriate colour-contrast requirements and never rely on colour alone to communicate meaning.

## Content and assets

- Before using an image, check ownership or licensing, quality, dimensions, aspect ratio, background compatibility, file size, and mobile crop behaviour.
- Prefer modern web formats where supported and provide sensible fallbacks when needed.
- Mark temporary copy, missing links, placeholder images, and unconfirmed details clearly in development.

## Performance and SEO

- Treat SEO as an ongoing requirement. Whenever a relevant page, component, content block, image, link, or deployment setting is changed, look for practical opportunities to improve search visibility without expanding the task unnecessarily.
- Keep the site lightweight and avoid dependencies that do not provide clear value.
- Optimize images, use appropriate dimensions and responsive sources, and lazy-load below-the-fold media.
- Write useful, client-approved, people-first content that naturally describes CGT's services and Yellowknife service area. Do not use keyword stuffing, hidden text, doorway content, or unsupported claims.
- Use semantic HTML, logical heading levels, descriptive links, meaningful image alternative text, and crawlable page content.
- Include a unique, descriptive page title, meta description, favicon, and appropriate social-sharing metadata.
- Keep confirmed business names, services, contact details, hours, and location information consistent with the Client Website Information Checklist and other approved public profiles.
- Preserve clear anchor navigation and internal linking so visitors and search engines can understand the one-page site's structure.
- Add a canonical URL, sitemap, and robots configuration after the production domain and deployment method are confirmed.
- Add accurate local-business structured data when the required business information and production URL are confirmed. Never place unconfirmed details in structured data.
- Protect Core Web Vitals and mobile usability by minimizing layout shifts, render-blocking assets, unnecessary code, and oversized media.
- Recheck indexability, metadata, canonical URLs, structured data, links, and mobile presentation before launch.

## Simplicity rules

- Prefer plain functions, simple data structures, local component state, and readable composition.
- Avoid abstractions built only for possible future use.

- Do not introduce a library when browser APIs or the existing stack are sufficient.
- Ask before adding new production dependencies.
- Handle realistic failures for the current task without building for extremely unlikely cases.
- Keep changes focused and do not combine unrelated cleanup with feature work.

## Testing and verification

- Run only commands that actually exist in the repository. Do not invent missing scripts.
- Before considering a change complete, run the relevant formatter, lint, type-check, tests, and production build when those scripts exist.
- Manually verify the affected user path at mobile and desktop sizes.
- Check navigation and anchors, buttons, contact details, form validation, loading/success/error states, external links, image loading, keyboard navigation, focus visibility, reduced motion, browser-console errors, and nearby sections.
- Test current major browsers where practical.
- Do not say a bug is fixed or a feature is complete without verifying the affected behaviour.
- If a check cannot be run because the project has not defined it, state that limitation.
- For bug reports, include reproduction steps, expected and actual results, affected browser or viewport, likely cause, files involved, and the smallest reasonable fix.

## Git and commit messages

- Keep branches and commits focused on one logical change where practical.
- Use a concise conventional-commit subject: `tag(scope): short summary`.
- Use `feat` for user-visible functionality, `fix` for broken behaviour, `style` for visual-only changes, `content` for approved copy or asset updates, `refactor` for behaviour-preserving structure changes, `docs` for documentation, `test` for tests, `build` for tooling or deployment builds, `ci` for automation, and `chore` for maintenance.
- Helpful scopes include `layout`, `navigation`, `about`, `services`, `reviews`, `faq`, `contact`, `footer`, `forms`, `responsive`, `accessibility`, `seo`, `assets`, `config`, and `deploy`. Feel free to add any the were not explicitly listed when necessary.
- Write commit subjects in the imperative mood. If the developer asks for a commit message describing work already completed, keep the body in past tense.
- For a multi-part change, add a concise body grouped by the areas that actually changed. Do not add empty headings.
- When asked for a commit message, first inspect recent commits, staged and unstaged changes, untracked files, and the relevant diff. Do not reuse a stale message after the working tree changes.
- Do not commit secrets, local environment files, build output, debug code, or unrelated formatting changes.

### Examples

Branch-name examples:

- `feature/services-section`
- `feature/contact-form`
- `fix/mobile-navigation`
- `style/hero-spacing`
- `content/update-service-copy`
- `seo/local-business-metadata`

Commit-subject examples:

- `feat(services): add responsive service cards`
- `feat(contact): add validated contact form`
- `fix(navigation): correct sticky header anchor offset`
- `style(responsive): refine mobile section spacing`
- `content(faq): add approved customer questions`
- `feat(seo): add local business structured data`
- `build(deploy): configure Render static-site deployment`
- `docs(agents): clarify external service responsibilities`

For a change with multiple meaningful parts, use a subject followed by grouped body sections that describe only the areas that changed. Example:

```text
feat(contact): add website enquiry form

feat:
- Added the approved contact fields and submission states.

accessibility:
- Added visible labels, keyboard focus styles, and announced validation errors.

config:
- Connected the form to the environment-configured Apps Script endpoint.
```

## Before coding

State briefly:

1. The problem being solved.
2. The relevant approved requirement or confirmed request.
3. The input, output, and files involved.
4. Why the proposed design is the simplest reasonable choice.
5. Any unresolved client decision, scope, cost, hosting, or maintenance consequence.

## After coding

State briefly:

1. What changed.
2. How to run it using scripts that exist in the repository.
3. How it was verified, including responsive and accessibility checks relevant to the change.
4. Any remaining placeholder, client decision, or deployment requirement.

Do not start the next phase unless explicitly asked.
