# Treemate website — Claude Code operating handbook

This file is auto-loaded by Claude Code whenever it's run in this repo. It
exists so you (a future, separately-invoked Claude Code session, with no
memory of prior sessions and no human answering questions in real time) can
run this website's ongoing SEO/content operations **on your own**: weekly
ranking checks, blog posts, careers freshness, and incremental SEO fixes.

Read this whole file before doing anything. It tells you what exists, what
NOT to touch, how to check search performance, what to write about, and how
to ship changes safely without a human in the loop.

## The prime directive: additive only, never break what exists

Treemate is a real, live business site with real traffic and a real brand.
**Every change you make must be additive.** Never restructure, redesign, or
rewrite existing pages, components, or copy unless a task explicitly asks
for a fix to that specific thing (e.g. "the stale /ai-services redirect").
Concretely:

- Never change the visual design system (colors, spacing, type scale,
  motion) — see "Design system" below and match it exactly for new work.
- Never touch existing page content/copy on Home, Software & AI, Marketing,
  HR Solutions, Customer Success, Portfolio, About, or Contact unless a
  task is specifically about fixing something broken on that page.
- Never remove or reorder the header navigation. New top-level nav items
  are a risk (the bar is already at 8 items) — prefer footer nav links or
  in-page cross-links.
- Every commit: run `git diff` and `git diff --stat` before committing and
  read the diff. If anything shows up that you didn't intend to touch
  (e.g. an incidental `package-lock.json` diff from a different npm
  version), `git checkout -- <file>` it before committing. Stage files by
  explicit name (`git add path/to/file`), never `git add -A` or `git add .`.
- Always run `npm run build` and `npm run lint` before committing. Both
  must pass clean.
- Ship every change as a PR (see "How to ship a change" below), never a
  direct push to `main`. **You may merge your own PRs** — but only under the
  conditions in "Autonomous merges and the audit trail" below, and never
  without leaving the trail that section requires. A merge deploys to the
  live site within a minute or two, so the trail is what makes it reversible.

## Project overview

- **What it is**: Marketing site for Treemate, a hybrid software
  consultancy + BPO operating out of Wyoming (US HQ/contracting) and
  Karachi, Pakistan (delivery). Four service lines: Software & AI,
  Marketing, HR Solutions, Customer Success.
- **Stack**: Vite 8 + React 19 + TypeScript, react-router-dom v7 (client-side
  routing, no SSR), Tailwind CSS 3, framer-motion for scroll reveals,
  lucide-react for icons. No CMS — all content lives in typed TS files under
  `src/data/`.
- **Hosting**: Vercel, auto-deploys from `main` on the GitHub repo
  `Nightmares4u/Treemate-Website`. There is no staging environment — a
  merged PR to `main` goes live. This is exactly why every PR must be
  clean, additive, and verified locally first.
- **No SSR, but the head is per-route**: it's a client-side SPA, so there's
  one `index.html` template. Per-route `<title>`/meta tags are handled at
  build time instead of with a runtime library — see "Per-route metadata"
  below before touching anything in `<head>` or adding a route.

## Design system — match this exactly for anything new

- Colors: navy `#0A1628`, teal `#0D9488`, mint `#B8F0DC`, cream `#F5F3EC`.
- Reusable components (in `src/components/`): `Container`, `SectionTitle`,
  `PageHero` (page hero with an optional `aside` slot — every top-level page
  uses this), `LinkButton` (has `to` for internal routes / `href` for
  external or mailto links), `MarkerAccent` (hand-drawn SVG decorations),
  `RevealGroup`/`Reveal` (framer-motion scroll-in animation wrapper — wrap
  new sections in this to match the site's motion language).
- Utility classes: `.u-card`, `.u-icon`, `.u-media`, `.u-underline`,
  `.u-arrow` — reuse these rather than writing new one-off styles.
- Content pattern: every content type is a typed array in `src/data/`
  (`services.ts`, `portfolio.ts`, `navigation.ts`, `site.ts`, `careers.ts`,
  `blog.ts`). New content should follow this pattern — add a typed entry to
  the relevant data file, don't hardcode content into JSX, don't add a CMS
  or new content-authoring dependency.
- Before building any new page or component, open 2-3 existing ones
  (`src/pages/AboutPage.tsx`, `src/pages/CareersPage.tsx` are good
  references) to internalize spacing/structure. After building, run
  `npm run build` and visually sanity-check — Playwright + a screenshot
  against the live site is the fastest way if you have browser tooling
  available.

## Current state (as of 2026-09-08)

Already shipped to `main`:
- **Careers page** (`/careers`, `src/pages/CareersPage.tsx` +
  `src/data/careers.ts`): 7 open roles — Sales Voice (Intl + Domestic),
  Sales Chat (Intl + Domestic), Software Engineer, Graphic Designer, Social
  Media Manager. Each "Apply Now" button is a `mailto:` link to
  `sales@treemate.us` with a prefilled subject/body — there's no ATS.
- **Blog system** (`/blog`, `/blog/:slug` — `src/pages/BlogPage.tsx`,
  `src/pages/BlogPostPage.tsx`, `src/data/blog.ts`): 3 seed posts already
  written. This is the main lever you have for ongoing SEO — see "Weekly
  SEO runbook" below.
- **`robots.txt`** (`public/robots.txt`) pointing to the sitemap.
- **`scripts/generate-sitemap.mjs`**: regenerates `public/sitemap.xml` from
  the static route list + every blog post slug/date. Dependency-free
  (plain Node, regex-extracts blog frontmatter rather than importing the
  TS file). Run via `npm run seo:sitemap`. **Run this every time you add a
  blog post or a new route**, and commit the updated `sitemap.xml`.
- **`scripts/seo/gsc-report.mjs`**: pulls Search Console performance data
  (queries + pages, clicks/impressions/CTR/position) and writes a dated
  Markdown report to `reports/seo/<date>.md`. Run via `npm run seo:report`.
  Needs the credentials described in "Google Search Console API setup"
  below — until those are set up, it exits with a clear error rather than
  crashing.
- **Per-route metadata** (see the dedicated section below): every route gets
  its own title, description, canonical, and social tags, plus `Organization`
  and `BlogPosting` structured data.
- **Automated monitoring**: `.github/workflows/seo-report.yml` pulls Search
  Console data every Monday and commits the report;
  `.github/workflows/seo-check.yml` blocks PRs that leave the sitemap stale or
  a route without unique metadata.
- **Redirect fix**: `/ai-services` (an old, still-indexed route name from
  a previous brand/site iteration, "Treemate Growth Partners") now
  permanently redirects to `/software-ai` (`vercel.json` → `redirects`).
  This existed because the SPA's catch-all rewrite was serving a soft-404
  (HTTP 200 + NotFoundPage content) for a URL Google still had indexed.

## Known SEO gaps — prioritized backlog for you to work through

Work through these opportunistically, one PR at a time, always verified
with build+lint+diff review first. None of these are urgent/blocking; treat
this as a backlog to chip away at during otherwise-quiet weekly runs.

1. ~~**No per-route meta tags**~~ — **done**, see "Per-route metadata" below.
   Handled at build time rather than with `react-helmet-async`, which the
   earlier version of this file suggested; no runtime dependency was needed.
2. ~~**No structured data**~~ — **done**. `Organization` JSON-LD is in
   `index.html`, `BlogPosting` is injected per post by the build step. Both
   deliberately omit `streetAddress`; see "GBP / address issue" below.
3. **No analytics**. Confirmed via Vercel API that Web Analytics isn't
   enabled on the project. Either enable Vercel Web Analytics (adds
   `@vercel/analytics`, minimal setup, privacy-friendly, no cookie banner
   needed) or wire up GA4 — Vercel Analytics is the lower-effort/lower-risk
   option and is the recommended default unless the user asks for GA4
   specifically (e.g. for GSC-adjacent audience data Vercel doesn't give
   you).
4. **Oversized, unoptimized images.** Several images in the build are
   >1.5MB, some >2MB: `Callus-treemate.png` (2.24MB), `one-loop.png`
   (2.01MB), `US-PK.png` (1.85MB), `Gen-Ai.png` (1.77MB),
   `Email-treemate.png` (1.68MB), plus `sir-raza-portrait.png` (923KB) and
   `hero-meeting.png` (583KB) — check `npm run build` output for the
   current full list/sizes. Convert to WebP and/or compress (e.g.
   `sharp` via a one-off Node script, or `squoosh-cli`) and swap the
   `import` paths. Do this image-by-image in small PRs, and visually
   diff each one (screenshot before/after) to make sure quality holds up —
   these are real photos/graphics used across live pages, not
   placeholders.
5. **JS bundle is one 585KB chunk** (see build output warning). Not a
   priority unless load-time SEO signals (Core Web Vitals in GSC) show a
   real problem — check the GSC report / PageSpeed Insights before
   spending time here. If you do: route-based code-splitting via
   `React.lazy` on the page components in `App.tsx` is the standard fix.

## Per-route metadata — how the head works, and what to do when you add a route

The site serves one `index.html`, so without help every URL would share one
title and description. Two pieces fix that, and neither adds a dependency:

- **`scripts/seo/generate-static-meta.mjs`** runs automatically as the last
  step of `npm run build`. It takes the built `dist/index.html`, swaps in each
  route's own title/description/canonical/OG/Twitter tags, and writes
  `dist/<route>/index.html`. Vercel checks the filesystem before the SPA
  catch-all rewrite in `vercel.json`, so these files are what crawlers
  actually receive. Blog posts additionally get `BlogPosting` JSON-LD.
  `/` is deliberately skipped — `dist/index.html` *is* the homepage, and
  re-rendering it would overwrite its hand-written `og:description`.
- **`src/components/RouteMeta.tsx`** is mounted once in `Layout` and updates
  the same tags in place on client-side navigation, where no new document is
  ever fetched. It edits existing tags rather than appending, so the head
  never accumulates duplicates.

**The copy lives in `src/data/seo.ts`** — one entry per static route. Blog post
titles and descriptions are derived from `src/data/blog.ts`, not duplicated.

**When you add a route**, do all three or CI will fail:
1. Add the `<Route>` in `src/App.tsx`.
2. Add a `routeMeta` entry in `src/data/seo.ts` (title under ~60 chars,
   description 140-160, both unique — the check enforces uniqueness).
3. Add the path to `staticRoutes` in `scripts/generate-sitemap.mjs`, then run
   `npm run seo:sitemap` and commit `public/sitemap.xml`.

Adding a blog post only needs step 3's sitemap regeneration — its metadata is
picked up from `blogPosts` automatically.

`scripts/seo/verify-route-meta.mjs` (run by CI after every build) fails the
PR if any route is missing a title, description, or canonical, or if two
routes share either. Run `npm run build && node scripts/seo/verify-route-meta.mjs`
locally to check before pushing.

Note that `src/data/seo.ts` imports its siblings with explicit `.ts`
extensions. That is deliberate: the build script imports the same file under
Node's native type stripping, which needs the extension. `engines.node` is
pinned to `22.x` for the same reason.

## Canonical host — an open question, deliberately not yet decided

The repo and the hosting disagree about which hostname is canonical, and as of
2026-09-08 this is unresolved on purpose:

- `src/data/site.ts` (`siteConfig.url`), `public/sitemap.xml`, and
  `public/robots.txt` all say **`https://treemate.us`**.
- Vercel serves **`https://www.treemate.us`** and 307-redirects every apex URL
  to it, sitewide. Verified with `curl` on `/`, `/software-ai`, `/blog`,
  `/careers`.

So every URL in the sitemap redirects, `robots.txt` advertises a redirecting
sitemap URL, and the canonical tags generated from `siteConfig.url` point at
URLs that don't serve a 200. Search engines tolerate this but it splits signals
between two hosts and wastes a hop on every crawl.

**The user chose to decide this on Search Console data rather than inference** —
whichever host Google has actually indexed and is sending traffic to should win.
Once reporting is live:

1. Run `npm run seo:sites` to see which host the property is registered under.
2. Compare impressions between the hosts if both properties exist.
3. Then either update `siteConfig.url` + sitemap + robots to `www` (code-only,
   no hosting change), or flip Vercel's primary domain to the apex (one
   dashboard setting, but moves whatever is indexed on `www`).

Do not silently pick one during a routine run. Surface the numbers and let the
user decide; it's a one-line change either way once the data is in.

## The GBP / registered-agent address issue — human action needed, not yours to fix in code

Research during setup found that the company's public address, used in
`src/data/site.ts` (`siteConfig.address`) and the Google Business Profile
listing — **30 N Gould St, Ste R, Sheridan, WY 82801** — is the literal
headquarters of Registered Agents Inc., a commercial registered-agent
mail-drop address shared by tens of thousands of unrelated LLCs. This is
legally fine (it's the registered agent for the WY LLC) but it's a real SEO
and trust liability: Google's local ranking algorithm and local map-pack
results generally suppress or ignore addresses that are shared across many
unrelated businesses, and third parties doing due diligence (partners,
enterprise procurement, even Amazon Seller Central-style verification) can
flag it.

**Do not silently remove or change this address in code** — it's the
legally correct registered-agent address and likely needs to match state
filings. The correct fix is on the **Google Business Profile side, not the
codebase**: convert the GBP listing to a "service-area business" (this
hides the exact street address from public view while keeping the
business verified in its service area), per Google's own guidelines for
businesses that don't serve customers at their listed address. **This
requires a human with access to the Google Business Profile account** — it
is not something you can do from this repo. If you're running a scheduled
check and this hasn't been done yet, mention it in your summary/report
each time so it doesn't get lost, but don't block other work on it.

## Weekly SEO runbook

This is the loop to run on a weekly cadence (see "Scheduling" for how the
user should trigger this without manual input).

1. **Run the GSC report**: `npm run seo:report` (needs credentials — see
   setup below; if not yet configured, note that in your summary and skip
   to step 4). This writes `reports/seo/<date>.md`.
2. **Read the report** and compare it to the previous week's file in
   `reports/seo/` if one exists:
   - Queries with high impressions but low CTR or position 8-20 → these
     are the best blog-topic candidates. Someone is searching that exact
     phrase and finding Treemate barely, or not converting on the click.
     Write a post targeting that phrase (see "Blog cadence" below).
   - Queries already at position 4-10 → on-page tightening can push them
     to page 1. Check whether the ranking page's `<title>`/H1/first
     paragraph contains the exact query phrase; if not, that's a small,
     safe, additive copy tweak to that page's data file (still verify with
     a human-readable diff — copy tweaks to *existing* pages should be
     minimal and precise, not rewrites).
   - Any page that dropped out of the top-pages list vs. last week →
     flag it, investigate (check `reports/seo/` history, check if
     anything changed on that route).
3. **Regenerate the sitemap** if any route or blog post changed:
   `npm run seo:sitemap`, commit the updated `public/sitemap.xml`.
4. **Write or ship one blog post** if the backlog (below) has a ready
   topic, or if step 2 surfaced a good query-driven topic. See "Blog
   cadence" below for tone/format.
5. **Check careers freshness**: confirm `src/data/careers.ts` still
   reflects real open roles. If the user hasn't told you about a role
   change, leave it as-is — don't invent or remove roles speculatively.
   If a task/commit message says a role opened or closed, update
   `jobOpenings` in `src/data/careers.ts` accordingly (additive edit to
   that one array, following the existing `JobOpening` shape).
6. **Pick at most one item off the "Known SEO gaps" backlog** above per
   week (skip if steps 1-5 already produced a full PR's worth of change —
   don't bundle unrelated things into one PR).
7. **Ship everything as one or more small PRs** (see below), and post a
   short summary as the PR description: what changed, why, and what the
   GSC numbers showed.

## Blog cadence and topic backlog

**Tone** (matches existing copy — read `src/data/blog.ts`'s existing 3
posts before writing a new one): short, punchy, corporate. No fluff intros,
no "in today's fast-paced world"-style filler. Get to the point in the
first sentence. Geographic scope for all claims: North America and
Australia (don't imply a market presence outside that). Do not blend
Treemate content with any other company/brand — Treemate posts are about
Treemate's own services and positioning only.

**Format**: add an entry to the `blogPosts` array in `src/data/blog.ts`
following the existing `BlogPost` shape exactly (`slug`, `title`, `date`
ISO format, `author`, `category` — one of the four service lines or
"Company News", `excerpt`, `readMinutes`, `body` as an array of
`{type:"p"|"h2"|"list", ...}` blocks, `seoKeywords`). Aim for 600-1000
words (`readMinutes` 3-5). After adding, run `npm run seo:sitemap` to pick
up the new post's URL.

**Topic backlog** (pick from here, or from GSC query data once available —
prefer real query data once you have it, this list is a fallback):
- Software & AI: "when to build custom software vs. buy SaaS", "what an
  AI-enabled support desk actually looks like", "signs your internal
  tooling has outgrown spreadsheets"
- Marketing: "what a US company should expect from an outsourced marketing
  team", "how to brief an agency so you don't get generic work back"
- HR Solutions: "what cross-border hiring (US + Pakistan) actually costs
  vs. a US-only hire" (there's already a post on this exact topic —
  `cross-border-hiring-us-pakistan` — write a *different* angle, e.g.
  onboarding/compliance/time-zone management specifics, not a duplicate)
- Customer Success: "when to bring customer support in-house vs. keep it
  outsourced", "what good CSAT reporting looks like from a BPO partner"
- Company News: use sparingly, only for real milestones (new hires
  featured on the careers page, actual company updates) — don't fabricate
  news to fill a slot.

Do not invent specific client names, revenue figures, or headcount numbers
that aren't already established elsewhere in the site's existing content —
keep new copy consistent with claims the site already makes about itself.

## Careers posting maintenance

The careers page is static data (`src/data/careers.ts`), not a live
ATS feed, so it needs a human (or an explicit task instruction) to say
when a role opens or closes — you should not add/remove roles on your own
judgment during a routine SEO pass. What you *can* do autonomously:
- Keep the page technically fresh: if `sitemap.xml`'s `/careers` entry is
  stale relative to actual changes, regenerate it.
- If a role has been open a long time, that's worth flagging in your
  summary (not fixing) — the user may want to refresh copy or reconsider
  the role, but that's their call.

## Google Search Console API setup (one-time)

`scripts/seo/gsc-report.mjs` needs a Google Cloud service account.
**`scripts/seo/setup-gsc.sh` does almost all of this for you** — it creates the
project, enables the Search Console API, creates the service account, issues a
JSON key into `~/.secrets/treemate/`, and writes the env var into `.env.local`.
It is idempotent, so re-running it is safe.

    gcloud auth login          # human step: real Google account, real browser
    ./scripts/seo/setup-gsc.sh

Two things the script cannot do, because Google exposes no API for either:

- **Granting the service account access to the property.** Search Console has
  no permissions API — it is a Settings → Users and permissions screen and it
  must be a human click. The script prints the exact URL and the service
  account address to paste, with "Restricted" (read-only) permission. Without
  this step the API returns 403 no matter how the key is configured.
- **Storing the key as a GitHub Actions secret**, if the weekly workflow should
  run. The script prints the `gh secret set` command for that too.

If you are a scheduled run and the credential still isn't configured, say so
explicitly in your summary and carry on with the rest of the runbook — do not
try to work around it, and do not touch the key material yourself.

The environment variables involved (see `.env.example`):
- `GSC_SERVICE_ACCOUNT_JSON` — the full content of the JSON key, as a
  single-line string. This is what the GitHub Actions workflow uses: one
  secret, no file path to manage.
- *or* `GSC_SERVICE_ACCOUNT_KEY_FILE` — a path to the key file, kept outside
  the repo. This is what `setup-gsc.sh` configures for local runs.
- `SITE_URL` — defaults to `https://treemate.us/`. Only change this if the
  Search Console property is domain-scoped rather than URL-prefix (then use
  `sc-domain:treemate.us`) — check which under Search Console → Settings →
  Ownership verification.

**Check the property host first with `npm run seo:sites`.** It lists every
property the service account can read. `https://treemate.us/`,
`https://www.treemate.us/` and `sc-domain:treemate.us` are three *different*
properties and only the matching one returns data — see the open question in
"Canonical host" below. If the listed host isn't the default, set `SITE_URL`.
An empty list means the credential works but the Search Console permission
step hasn't taken effect.

Test the whole chain with `npm run seo:report`. On success it prints a report
and saves it to `reports/seo/<date>.md`. A 403 almost always means the Search
Console user step above hasn't been done, or was done with a different
service account address.

None of this touches the website's own Google Search Console verification
tag (`google-site-verification` in `index.html`) — that's separate and
already in place; this setup is purely for the reporting API.

## How to ship a change (git workflow)

This repo's write access from an agent session works through a normal git
remote + a GitHub personal access token — there's no special tooling
needed beyond `git` and either `gh` or a plain `curl` to the GitHub REST
API for opening the PR. Standard flow:

1. Make your changes, verify with `npm run build && npm run lint`.
2. `git status --porcelain` and `git diff` — confirm only the files you
   meant to touch changed. Discard anything incidental (commonly
   `package-lock.json` if your `npm install` differs slightly from the
   committed lockfile's environment — `git checkout -- package-lock.json`
   if you didn't intend to touch it).
3. Create a feature branch: `git checkout -b <descriptive-branch-name>`.
4. Stage explicit files (never `-A`/`.`), commit with a clear message.
5. Push: `git push -u origin <branch-name>` (if push fails with an auth
   prompt/error, the remote's credentials need to be checked — this repo
   has previously been configured with a token embedded in the remote URL
   for exactly this reason; if that's gone, a human needs to supply a
   fresh GitHub PAT with `repo` scope).
6. Open a PR against `main` (via `gh pr create` or the GitHub REST API).
   Write a real description: what changed, why, what you verified.
7. Merge it yourself if — and only if — every condition in "Autonomous merges
   and the audit trail" below is met. If any one of them isn't, leave the PR
   open, say plainly in the PR description what you're waiting on, and move on
   to other work. An open PR is a normal outcome, not a failure.

## Autonomous merges and the audit trail

You are allowed to merge your own PRs to `main` without waiting for a human.
`main` auto-deploys to the live site, so this is a real production release
every time. The trade the user made is explicit: **speed in exchange for a
trail good enough to diagnose and undo any change without you present.**

Nothing here loosens the prime directive. Merge permission changes *who
presses the button*, not *what is allowed to change*.

### Before you merge — all six, no exceptions

1. **CI is green.** `seo-check` must pass on the PR. Never merge a red or
   still-running check, and never disable, skip, or "fix" a check by loosening
   it in the same PR that needs it to pass.
2. **The preview deployment was checked, not assumed.** Vercel builds a preview
   for every PR. Fetch the routes you touched on that preview URL and confirm
   the change is really there:
   `curl -s <preview-url>/<route> | grep -o '<title>[^<]*</title>'`
   A green build only proves it compiled, not that it does what you intended.
3. **The diff is only what you meant to change.** Re-read `git diff` against
   `main` one more time before merging.
4. **It's inside the autonomous scope** — see the escalation list below.
5. **The PR description is complete**: what changed, why, what data drove it,
   what you verified, and what you'd look at first if it broke.
6. **You can state how to undo it.** If you can't write the rollback line for
   the log, you don't understand the change well enough to merge it.

Use `gh pr merge <n> --squash` for a single-commit change, or `--merge` for a
stack. Never `--admin`, and never force-push `main`.

### After you merge — verify production, then log it

A merge you don't check is worse than an open PR, because everyone assumes
it worked.

1. **Wait for the production deploy and verify the live site.** Fetch the
   affected route on `www.treemate.us` and confirm the change is live and the
   page still renders. `gh run list` and the Vercel deployment status tell you
   when the deploy finished.
2. **If production is broken, roll back immediately — before investigating.**
   Fastest path is Vercel: Deployments → the last known-good production
   deployment → Promote to Production. That's live in seconds and needs no
   build. Then `git revert -m 1 <merge-sha>` and push, so the code matches
   what's deployed. Diagnose afterwards, not while the site is broken.
3. **Append one line to `reports/agent-log.md`** (create it if missing):

   ```
   | 2026-09-08 | #12 | 7ffbfcc | Weekly GSC workflow + SEO checks | git revert -m 1 7ffbfcc |
   ```

   Date, PR number, merge SHA, one-line summary, and the exact rollback
   command. This file exists so that a human debugging a broken site at speed
   has one place to look, with commands they can paste. Keep it newest-first
   and never rewrite past entries.
4. **Comment on the merged PR with the production verification result** — what
   you fetched, what you saw. That's the evidence the trail rests on.

The log is a curated view, not the source of truth. If it's ever out of date
or you suspect an entry is missing, `git log --merges --first-parent main`
is authoritative.

### Always escalate instead of merging

Open the PR, explain what you need, and stop. These stay human decisions:

- **Anything in the human-only list**: the GBP/registered-agent address,
  career role changes you weren't explicitly told about, and anything touching
  secrets or credentials.
- **The canonical host question** (see "Canonical host" above). The user chose
  to settle it on real Search Console data. Present the numbers; don't pick.
- **Existing page copy, the design system, or the header navigation** — beyond
  a precise, specifically-requested fix.
- **New dependencies**, or changes to `vercel.json`, the build pipeline, or
  the workflows themselves. The tooling that verifies your work is not
  something to change on your own authority.
- **Anything you're genuinely unsure about.** Uncertainty is a reason to leave
  it open, not a thing to resolve by merging and watching what happens.
- **More than one substantial change at once.** Merge them as separate PRs so
  a revert of one doesn't take the others with it.

If a merge went wrong and you're the one who finds it, say so directly in your
summary — what broke, what you did about it, and what you'd change. An honest
report of a bad merge is far more useful than a clean-looking one.


## Scheduling — what already runs on its own

Two GitHub Actions workflows handle the unattended half. They run on GitHub's
infrastructure, so nothing depends on anyone's laptop being awake.

- **`.github/workflows/seo-report.yml`** — Mondays 15:00 UTC. Runs
  `scripts/seo/gsc-report.mjs`, writes the report into the run summary, and
  commits it to `reports/seo/<date>.md` on `main`. Needs the
  `GSC_SERVICE_ACCOUNT_JSON` repository secret; if it isn't set the job fails
  loudly rather than skipping, so a site that looks monitored is never
  silently collecting nothing. Can also be run on demand from the Actions tab
  (`workflow_dispatch`), with a configurable look-back window.
- **`.github/workflows/seo-check.yml`** — on every PR and push to `main`.
  Builds, then fails if `public/sitemap.xml` no longer matches the site's
  routes and posts, or if any route lost its unique title/description/canonical.

**This is the one exception to "never push directly to `main`":** the report
workflow commits to `reports/seo/` and nothing else, and its commit message
carries `[skip ci]` so a data-only commit doesn't trigger a redeploy of an
identical build. Everything that touches the site itself still goes through a PR.

**What is still not automatic** is the judgment half of the weekly runbook —
reading the report, deciding which query deserves a post, writing it. To have
that happen unattended too, schedule a headless Claude Code run against a
persistent local clone (macOS `launchd`, or any always-on machine's cron):

```
claude -p "Read CLAUDE.md and run the weekly SEO runbook end to end. Ship what you change as a PR, merge it only if it meets the autonomous-merge checklist, and leave the audit trail that section requires." --cwd /path/to/treemate-website
```

That needs: a clone with working push credentials already configured, the GSC
env vars present in the scheduler's environment, and `claude -p` rather than
the interactive REPL, since nothing will be there to answer prompts. Verify the
schedule fires at least once before trusting it unattended.

## What "no constant input" means in practice for you

When you (Claude Code) are invoked against this repo with a generic
instruction like "run the weekly check" or no specific instruction at all
beyond "handle Treemate's SEO":

- Default to the Weekly SEO runbook above.
- Make reasonable calls on ambiguous judgment points (which backlog item
  to pick, which blog topic) rather than stopping to ask — there's no one
  there to answer.
- Never guess on the things this file explicitly says are human-only
  (GBP settings, career role changes not already instructed, secrets/
  credentials, the canonical host decision). Do the rest of the work, note
  what's blocked on a human, and stop there for that item — don't skip the
  whole run over one blocked item.
- You can merge your own work, but only against the checklist in "Autonomous
  merges and the audit trail". Leaving a PR open because a condition wasn't
  met is a correct outcome — report it as a decision, not as a blocker.
- Always leave a clear paper trail: a PR description or a final summary
  that states what changed, what the numbers showed, and what (if
  anything) needs a human decision.
