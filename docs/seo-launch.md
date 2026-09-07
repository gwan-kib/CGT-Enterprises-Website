# SEO launch checks

## Render redirect configuration

No repository-managed Render redirect configuration exists. The following rules are required in the static site's Render Dashboard under Redirects/Rewrites before replacing Squarespace. They have not been configured or verified by this change.

| Source | Destination | Action |
| --- | --- | --- |
| `/services` | `/#services` | Redirect (301) |
| `/about` | `/#about` | Redirect (301) |
| `/contact` | `/#contact` | Redirect (301) |

Place these specific rules before any wildcard fallback. Do not replace them with rewrites: the browser must receive the new URL. The application already scrolls to section hashes on initial load. No new React routes or hosting configuration are required. Render documents its Redirect action as HTTP 301: [Static Site Redirects and Rewrites](https://render.com/docs/redirects-rewrites).

Use `https://cgtenterprises.ca/` as the production origin. If `www.cgtenterprises.ca` is connected, ensure it permanently redirects to the non-www hostname, preserving paths and query strings. This is a domain-level setting, not a global path redirect on the canonical site, which could cause a loop. Verify the actual response after domain setup.

## Before cutover

- [ ] Configure and verify the three dashboard redirects, including any trailing-slash variants found in the old site's URL inventory.
- [ ] Check the old Squarespace sitemap and available Search Console URL reports for other indexed paths; preserve any additional established paths with reviewed redirects.
- [ ] Verify the Render build uses `npm run build` and publishes `dist/`, with both HTML entrypoints and the public files served directly.
- [ ] Verify desktop and mobile navigation, forms, public reviews, services, FAQ, and privacy links on the staging deployment. Live submissions and external delivery require their own checks.
- [ ] Confirm the client-facing name, phone, email, hours, Facebook link, and Yellowknife service area still match `src/data/business.ts`, visible content, and the static JSON-LD in `index.html`. No confirmed street address is stored or published in the structured data.
- [ ] Does the README need to be updated? The implemented SEO and asset behavior is documented; revisit deployment claims only after live verification.

## After deployment

- [ ] Confirm HTTPS and the non-www canonical origin. Verify any www redirect and all three old paths with an HTTP client and a browser; check 301 status, Location headers, final section position, and absence of loops.
- [ ] Confirm `/`, `/privacy-policy.html`, `/robots.txt`, `/sitemap.xml`, and `/images/cgt-social.png` return their actual files with successful responses and appropriate content types.
- [ ] Check the production HTML for exactly one title and canonical per page, the expected homepage Open Graph tags, valid JSON-LD, and no `noindex` or blocking `X-Robots-Tag` header. Confirm the public robots rules allow crawling.
- [ ] Validate the live JSON-LD with the [Schema.org validator](https://validator.schema.org/) and inspect the rendered homepage in Google Search Console. LocalBusiness markup describes confirmed facts; no search-feature eligibility or ranking is guaranteed.
- [ ] Submit `https://cgtenterprises.ca/sitemap.xml` in the existing Search Console property, inspect both real page URLs, and monitor indexing and old-URL errors after cutover.
- [ ] Verify the production social preview image, actual page load behavior, and layout stability on desktop and mobile. Preview caches can retain old metadata until refreshed.

## Asset provenance

The 1200 x 630 social image contains the existing `CGT Enterprises REV.png` artwork centered on black without cropping or adding copy. The 1024 x 986 hero PNG is a proportionally resized copy of that same source with transparency preserved. Source assets remain intact; no new dependency or generated artwork was added.
