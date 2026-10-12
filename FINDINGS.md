# Lead-capture audit — Issue #24

Scope of this run: **Treemate-Website only** (this worktree). EverNest is not in this checkout, so its contact form and WhatsApp links are **not audited** here; see the last section. This is a static code audit. No live site, Vercel dashboard, Apps Script deployment, or Google Sheet was accessed, so anything that depends on deployed config is marked as unverified.

Labels: WORKS / BROKEN / MISSING. "Unverified" means the code is correct but its runtime state needs a human to confirm.

## Summary (most likely causes of zero inquiries)

1. **MISSING: no notification when a lead arrives.** The form writes a row to a Google Sheet and nothing else. Unless someone opens the Sheet, a lead sits there unseen. With ~74 impressions/mo, a form that works but is never checked looks the same as "zero inquiries". This is the first thing to check and the most probable explanation.
2. **UNVERIFIED (could be total failure): `GOOGLE_APPS_SCRIPT_URL` and `FORM_API_SECRET` must be set in Vercel.** If either is missing, every submission gets a 500 and the visitor sees "The contact form is not configured correctly."
3. **MISSING: there is no WhatsApp link or number anywhere on the site.** The user expects WhatsApp inquiries, but there is no channel for them.
4. **MISSING: no conversion tracking.** Vercel Analytics only counts page views. It can't tell you whether anyone submitted the form, clicked the phone or clicked an email link.
5. **Low traffic.** About 74 impressions a month is a small funnel at any conversion rate, so zero leads could be partly just volume.

## 1. Contact form trace (browser → server → Sheet)

| # | Step | Label | Evidence |
|---|------|-------|----------|
| 1 | Entry points: header CTA, hero, CTA section and every service/about/portfolio hero "Book A Meeting" all link to `/contact` | WORKS | `src/components/layout/Header.tsx:117`, `src/components/sections/Hero.tsx:114`, `src/components/sections/CTASection.tsx:93`, `src/pages/ServicePage.tsx:38`, `src/App.tsx:48` |
| 2 | Form fields, native required/email validation, honeypot field | WORKS | `src/components/sections/ContactForm.tsx:135-295` |
| 3 | Client posts JSON to `/api/contact` and shows an error banner or a success dialog | WORKS | `ContactForm.tsx:54-91`, `:332-347`, `:351-355`; `src/components/ui/FormSuccessDialog.tsx` |
| 4 | `/api/contact` is excluded from the SPA rewrite, so the request reaches the function rather than `index.html` | WORKS | `vercel.json:14` |
| 5 | Server-side validation: method, body size, required fields, email, phone digits, honeypot | WORKS | `api/contact.ts:96-153` |
| 6 | Server reads `GOOGLE_APPS_SCRIPT_URL` / `FORM_API_SECRET` from env. If either is absent it returns 500 and the user sees "not configured correctly" | UNVERIFIED (BROKEN if unset) | `api/contact.ts:155-166`; `.env.example:8,12`. The Vercel project env vars could not be checked from the repo. |
| 7 | Server forwards to the Apps Script web app and returns 502 if the response isn't JSON or `success` is false | WORKS (code) | `api/contact.ts:168-196` |
| 8 | Apps Script checks the secret, appends a row to the "Leads" tab and sets Status = "New" | WORKS (code), UNVERIFIED deployed | `google-apps-script/Code.gs:117-123`, `:163-177`. The deployment must be a Web app with "Anyone" access and `API_SECRET` set as a script property (`docs/CONTACT_FORM_SETUP.md`). |
| 9 | **Nothing tells a human a lead arrived.** There is no `MailApp`/`GmailApp` call, no Slack/webhook call and no time-driven or on-edit trigger. | **MISSING** | `Code.gs:165-182`; grep for `MailApp`, `notif` and `trigger` finds nothing in `Code.gs` or `docs/CONTACT_FORM_SETUP.md` |
| 10 | No client-side failure fallback. On error the user sees a message but no alternative contact, so a lead is lost if the backend is down | MISSING | `ContactForm.tsx:83-90` |
| 11 | Service dropdown offers Software & AI / HR Solutions / BPO Services / Not sure. The site's four service lines are Software & AI, Marketing, HR Solutions and Customer Success, so a Marketing prospect has no matching option | BROKEN (minor, a conversion friction) | `ContactForm.tsx:33-38` vs `src/data/services.ts`. Not changed, because it is Contact page copy and the repo rules say not to edit it without being asked. |
| 12 | Phone and Name are mandatory (6 required fields) | Note | `api/contact.ts:30-37`. This is high friction for a first inquiry and worth considering for a human to simplify. |

## 2. Other contact channels

| Channel | Label | Evidence |
|---------|-------|----------|
| `tel:` link to +1 780 804 0473 (Contact cards, footer). The number is consistent with the JSON-LD in `index.html`. 780 is an Alberta area code even though the business is described as Wyoming-based. Human to confirm it is the number actually answered. | WORKS (format) / UNVERIFIED (answered) | `src/data/site.ts:20-23`, `src/components/sections/ContactCards.tsx:29-36`, `src/components/layout/Footer.tsx:113-118`, `index.html:50` |
| `mailto:` contact@treemate.us (Contact cards, footer) and sales@treemate.us (CTA section, careers) | WORKS (format) / UNVERIFIED (mailbox exists and is monitored) | `site.ts:15-19`, `ContactCards.tsx:22-28`, `Footer.tsx:124`, `CTASection.tsx:104` |
| **WhatsApp link / floating button / number** | **MISSING** | `grep -i "whatsapp\|wa.me"` finds mentions only in marketing copy and portfolio text (`src/data/careers.ts:81-106`, `portfolio.ts:208-243`, `SaasTree.tsx:101-103`), and no actionable link or number. `siteConfig` (`site.ts`) has no WhatsApp field. |

## 3. Tracking and confirmation UX

| Item | Label | Evidence |
|------|-------|----------|
| Vercel Web Analytics page views | WORKS | `src/main.tsx:14` |
| Custom events for form submit, phone click, email click or WhatsApp click | MISSING | no `track(` call anywhere in `src/` |
| Success confirmation dialog | WORKS | `FormSuccessDialog.tsx`, `ContactForm.tsx:76-82` |
| Confirmation email to the submitter | MISSING | none in `Code.gs` |

## 4. Fixes applied

**None.** There was nothing trivially and safely fixable:
- No WhatsApp number exists in the repo, and inventing one would be wrong.
- The phone and email values are internally consistent.
- Every remaining issue needs credentials, third-party config, or copy/design changes that the repo rules (`CLAUDE.md`) reserve for a human.

No credentials, env vars, Apps Script deployments or third-party configs were touched.

## 5. Needs-human remediation (in priority order)

1. **Check the Sheet and the deployment now (about 10 minutes).**
   - Open the "Treemate Website Leads" Sheet and look at the Leads tab. Any rows, including old ones, prove the pipeline works and the leads were simply unseen.
   - Vercel → Project → Settings → Environment Variables: confirm `GOOGLE_APPS_SCRIPT_URL` (must end in `/exec`) and `FORM_API_SECRET` exist for **Production**.
   - Apps Script → Project Settings → Script Properties: `API_SECRET` must equal `FORM_API_SECRET` exactly.
   - Apps Script → Deploy → Manage deployments: type Web app, Execute as Me, Access Anyone.
   - Open the `/exec` URL in a browser. It should show `{"success":true,"message":"Treemate contact endpoint is live."}`.
   - Submit one test lead on https://www.treemate.us/contact. A row should appear. If the page shows "not configured correctly", env vars are missing. If it shows "could not be saved" or "unexpected response", the secret or deployment access is wrong, and Vercel → Logs will show `api/contact`.
2. **Add lead notification (needs the Apps Script owner).** In `google-apps-script/Code.gs`, after `sheet.appendRow(...)` (line 165-177), add a `MailApp.sendEmail("sales@treemate.us", "New Treemate lead: " + row.service, <summary of row fields>)` call, wrapped in its own try/catch so a mail failure can't fail the submission. Then redeploy via Deploy → Manage deployments → Edit → New version. The first run requires the owner to authorize the Gmail scope. Alternative with no code: in the Sheet, Tools → Notification settings → "Notify me when any changes are made… Email – right away". Note this is a cheap stopgap and not reliable for row appends made by scripts.
3. **Decide on WhatsApp.** If WhatsApp is a real channel, supply the business number in international format (digits only). Then a dev should add `whatsapp: { display, href: "https://wa.me/<number>?text=<encoded greeting>" }` to `siteConfig` (`src/data/site.ts`) and a card in `ContactCards.tsx` plus a footer link. This is additive, but the number must come from the owner. Don't use the +1 780 number unless it is confirmed to be WhatsApp-registered.
4. **Add conversion tracking (additive).** `@vercel/analytics` is already installed: `import { track } from "@vercel/analytics"` and call `track("contact_submit")` on the success path (`ContactForm.tsx:76`), plus `track("click_phone")`/`track("click_email")`/`track("click_whatsapp")` on the contact links. Custom events need to be enabled on the Vercel plan. Without this the funnel can't be measured.
5. **Fix the service dropdown** (`ContactForm.tsx:33-38`) to match the four service lines (add Marketing, rename "BPO Services" to Customer Success, or similar). The Apps Script stores `service` as free text, so no backend change is needed. This is a copy change, so it needs owner sign-off.
6. **Add a failure fallback.** On error, show the `mailto:contact@treemate.us` link next to the error banner (`ContactForm.tsx:332-347`), so a visitor can still reach the business.
7. **Confirm the phone number and mailboxes** (`site.ts:15-23`): that +1 780 804 0473 is answered, and that contact@, sales@ and support@ receive mail.
8. **Consider reducing required fields** (`api/contact.ts:30-37`, `ContactForm.tsx`): phone and last name are mandatory, which tends to cut inquiry volume.

## 6. EverNest-Website: not audited in this run

The EverNest repo isn't in this worktree, so the contact form, WhatsApp deep links, counsellor-callback delivery and EverNest tracking were not inspected. Nothing in this report should be assumed to apply to EverNest. As the issue notes, a follow-up job should audit it. The checks above (where the form submits, whether a human is notified, whether the WhatsApp number/`wa.me` link is correct, whether events are tracked) are a ready template.
