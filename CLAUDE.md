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
  direct push to `main`. The user reviews and merges PRs; you don't need
  their real-time input to open one, but don't merge it yourself.

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
- **No SSR/prerendering**: it's a pure client-side SPA. This matters for
  SEO — see "Known SEO gaps" below; per-route `<title>`/meta tags need
  `react-helmet-async` (or similar) since there's currently only one static
  `<title>` in `index.html` shared by every route.

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
- **Redirect fix**: `/ai-services` (an old, still-indexed route name from
  a previous brand/site iteration, "Treemate Growth Partners") now
  permanently redirects to `/software-ai` (`vercel.json` → `redirects`).
  This existed because the SPA's catch-all rewrite was serving a soft-404
  (HTTP 200 + NotFoundPage content) for a URL Google still had indexed.

## Known SEO gaps — prioritized backlog for you to work through

Work through these opportunistically, one PR at a time, always verified
with build+lint+diff review first. None of these are urgent/blocking; treat
this as a backlog to chip away at during otherwise-quiet weekly runs.

1. **No per-route meta tags** (highest impact, most work). Every route
   currently shares the one static `<title>`/`<meta description>` in
   `index.html`. Add `react-helmet-async`: wrap `App` in
   `HelmetProvider`, add a `<Helmet>` block to each page component with a
   unique title/description/OG tags. Blog posts especially need this —
   right now every blog post has an identical `<title>` in search results.
2. **No structured data**. Add `Organization` JSON-LD to the site (name,
   url, logo, sameAs → social links) via a `<script type="application/
   ld+json">` in `index.html` or injected via Helmet. **Do not include a
   `streetAddress` in this markup** — see "GBP / address issue" below for
   why. Add `BlogPosting` JSON-LD per blog post once react-helmet-async is
   in place (headline, datePublished, author).
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

## Google Search Console API setup (one-time, human-only)

`scripts/seo/gsc-report.mjs` needs a Google Cloud service account. This is
a one-time setup that requires a human with access to the Google account
that owns the `treemate.us` Search Console property (this cannot be done
by an agent — it requires clicking through Google's own consoles and
logging into a real Google account). If these env vars aren't set yet when
you run a weekly check, **tell the user exactly what's missing and give
them these steps** rather than trying to work around it:

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and
   create a new project (or reuse an existing one) — e.g. "treemate-seo".
2. In that project, go to **APIs & Services → Library**, search for
   "Google Search Console API", and click **Enable**.
3. Go to **APIs & Services → Credentials → Create Credentials → Service
   account**. Give it any name (e.g. "gsc-reporter"). No special IAM roles
   are needed at the project level — access is granted separately in
   Search Console itself (step 5).
4. Open the new service account → **Keys** tab → **Add Key → Create new
   key → JSON**. This downloads a `.json` file — **treat it like a
   password, never commit it to the repo**. Note the service account's
   email address (looks like
   `gsc-reporter@treemate-seo.iam.gserviceaccount.com`) — you'll need it
   in the next step.
5. Go to [search.google.com/search-console](https://search.google.com/search-console),
   select the `treemate.us` property, go to **Settings → Users and
   permissions → Add user**, paste the service account's email address,
   and grant it **Restricted** (read-only) access. This is the step that
   actually grants the script permission to read data — the GCP project
   setup alone does nothing without this.
6. Set the environment variables the script reads (see `.env.example`):
   - `GSC_SERVICE_ACCOUNT_JSON` — the full content of the downloaded JSON
     key file, as a single-line string. This is the easiest option for a
     scheduled/headless job (see "Scheduling" below) since it's just one
     env var, no file path to manage.
   - *or* `GSC_SERVICE_ACCOUNT_KEY_FILE` — a path to the downloaded JSON
     file, kept somewhere outside the repo (e.g. `~/secrets/gsc-key.json`).
     Easier for interactive local runs.
   - `SITE_URL` — defaults to `https://treemate.us/`. Only change this if
     the Search Console property is domain-scoped instead of URL-prefix
     (in which case use `sc-domain:treemate.us`) — check which type the
     property is under Search Console → Settings → Ownership verification.
7. Test it: `npm run seo:report`. On success it prints a report and saves
   it to `reports/seo/<date>.md`. If it fails with a 403/permission error,
   the most common cause is step 5 not being done yet, or done with the
   wrong service account email.

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
   Write a real description: what changed, why, what you verified. Do not
   merge it yourself — leave it for the user to review, unless a task
   explicitly says to auto-merge low-risk scheduled changes (it currently
   does not — always leave PRs open for review).

## Scheduling this to actually run weekly with zero manual input

Cowork's own scheduling tools don't apply here since this is a repo meant
to be run via the standalone Claude Code CLI, invoked by the user outside
of any specific chat session. The practical way to get a true "runs every
week with no one touching it" setup is an OS-level scheduler on a machine
that's on, calling `claude` headlessly:

**macOS (launchd)** — more reliable than cron for a laptop that sleeps:
create `~/Library/LaunchAgents/us.treemate.seo-weekly.plist` running
something like:
```
claude -p "Read CLAUDE.md and run the weekly SEO runbook end to end. Open a PR with anything you changed and summarize the GSC numbers in the PR description." --cwd /path/to/treemate-src
```
on a `StartCalendarInterval` (e.g. Monday 9am), with `RunAtLoad` false.
Load it with `launchctl load ~/Library/LaunchAgents/us.treemate.seo-weekly.plist`.

**Linux/always-on machine (cron)**: a weekly crontab entry calling the same
`claude -p "..."` command with `--cwd` pointed at a persistent local clone
of this repo (with git remote credentials already configured, and the GSC
env vars set in the shell's environment or a sourced `.env` file — `claude
-p` runs non-interactively and won't prompt for anything, so all required
env vars must already be present in the calling shell's environment before
it starts).

Either way, the key requirements are: (1) a persistent local clone with
working git push credentials already configured (not something to redo
every run), (2) the GSC env vars available in the environment the
scheduler runs the command in, (3) `claude -p` (non-interactive/print mode)
rather than the interactive REPL, since nothing will be there to type
responses. The user should verify the schedule actually fires at least
once before trusting it to run unattended long-term.

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
  credentials, merging PRs). Do the rest of the work, note what's blocked
  on a human, and stop there for that item — don't skip the whole run over
  one blocked item.
- Always leave a clear paper trail: a PR description or a final summary
  that states what changed, what the numbers showed, and what (if
  anything) needs a human decision.
