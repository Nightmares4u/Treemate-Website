#!/usr/bin/env node
/**
 * Pulls Search Console performance data (queries, impressions, clicks,
 * position) for treemate.us and writes a dated Markdown report to
 * reports/seo/. This is the weekly "check keywords/ranking" tool.
 *
 * Auth: a Google Cloud service account with the Search Console API enabled,
 * added as a user on the treemate.us property in Search Console itself.
 * No `googleapis` / `google-auth-library` dependency — this hand-signs the
 * JWT with Node's built-in `crypto` module and calls the REST API with
 * `fetch` (Node >=18), so it needs nothing beyond what's already installed.
 *
 * See CLAUDE.md → "Google Search Console API setup" for how to create the
 * service account and JSON key referenced below.
 *
 * Required env vars (put these in `.env.local` for local runs, or in the
 * environment the scheduled job runs under — never commit the key):
 *   GSC_SERVICE_ACCOUNT_JSON   Full JSON key content, as a single-line string
 *                              (or set GSC_SERVICE_ACCOUNT_KEY_FILE to a path instead)
 *   SITE_URL                   Defaults to "https://treemate.us/" (URL-prefix
 *                              property format — use "sc-domain:treemate.us"
 *                              instead if the property is domain-scoped)
 *
 * Usage:
 *   node scripts/seo/gsc-report.mjs
 *   node scripts/seo/gsc-report.mjs --days 7   (default 28)
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { createSign } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

// Load .env.local for interactive local runs — that's where setup-gsc.sh writes
// GSC_SERVICE_ACCOUNT_KEY_FILE, and without this the file would sit there being
// silently ignored. Real environment variables take precedence over the file,
// so CI passing GSC_SERVICE_ACCOUNT_JSON as a secret still wins, and a missing
// file is normal rather than an error.
const envFile = join(root, ".env.local");
if (existsSync(envFile) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envFile);
}

const DAYS = Number(
  process.argv.find((a) => a.startsWith("--days="))?.split("=")[1] ??
    (process.argv.includes("--days")
      ? process.argv[process.argv.indexOf("--days") + 1]
      : 28),
);

const SITE_URL = process.env.SITE_URL ?? "https://treemate.us/";

function loadServiceAccount() {
  if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
  }
  if (process.env.GSC_SERVICE_ACCOUNT_KEY_FILE) {
    return JSON.parse(readFileSync(process.env.GSC_SERVICE_ACCOUNT_KEY_FILE, "utf8"));
  }
  console.error(
    [
      "Missing Search Console credentials.",
      "",
      "Set one of:",
      "  GSC_SERVICE_ACCOUNT_JSON       (the full service-account JSON key, as a string)",
      "  GSC_SERVICE_ACCOUNT_KEY_FILE   (path to the downloaded .json key file)",
      "",
      "See CLAUDE.md → 'Google Search Console API setup' for how to create one.",
      "This is a one-time setup only a human with Google account access can do.",
    ].join("\n"),
  );
  process.exit(1);
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Exchange a service-account key for a short-lived OAuth access token (JWT bearer flow). */
async function getAccessToken(sa) {
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const claims = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signInput = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signInput);
  signer.end();
  const signature = base64url(signer.sign(sa.private_key));
  const jwt = `${signInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(
      `Token exchange failed (${res.status}): ${JSON.stringify(body)}. ` +
        "Check that the service account email has been added as a user on the Search Console property.",
    );
  }
  return body.access_token;
}

/**
 * Lists the Search Console properties this service account can read.
 *
 * A property is identified by the exact host it was registered under, so
 * "https://treemate.us/", "https://www.treemate.us/" and "sc-domain:treemate.us"
 * are three different properties and only the right one returns data. This is
 * also the quickest way to confirm the Search Console permission step actually
 * took effect: an account that hasn't been added anywhere lists nothing.
 */
async function listSites(token) {
  const res = await fetch("https://searchconsole.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(`sites.list failed (${res.status}): ${JSON.stringify(body)}`);
  }
  return body.siteEntry ?? [];
}

async function queryAnalytics(token, dimensions, rowLimit = 25) {
  const end = new Date();
  end.setDate(end.getDate() - 2); // GSC data lags ~2 days
  const start = new Date(end);
  start.setDate(start.getDate() - DAYS);
  const fmt = (d) => d.toISOString().slice(0, 10);

  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions,
        rowLimit,
      }),
    },
  );
  const body = await res.json();
  if (!res.ok) {
    // The overwhelmingly common cause is SITE_URL naming a property that
    // exists but this account can't read, or naming the wrong host entirely.
    // Listing what it *can* read turns a bare 403 into an actionable answer.
    let hint = "";
    try {
      const sites = await listSites(token);
      hint = sites.length
        ? `\n\nProperties this service account can read:\n${sites
            .map((s) => `  ${s.siteUrl}  (${s.permissionLevel})`)
            .join("\n")}\n\nSet SITE_URL to the one you want (currently "${SITE_URL}").`
        : "\n\nThis service account can't read any Search Console property yet. " +
          "Add its email address under Search Console -> Settings -> Users and " +
          "permissions, with Restricted access. See CLAUDE.md.";
    } catch {
      // Listing is a nicety; if it fails too, the original error still stands.
    }
    throw new Error(
      `searchAnalytics.query failed (${res.status}): ${JSON.stringify(body)}${hint}`,
    );
  }
  return { rows: body.rows ?? [], startDate: fmt(start), endDate: fmt(end) };
}

function table(headers, rows) {
  const line = (cells) => `| ${cells.join(" | ")} |`;
  return [
    line(headers),
    line(headers.map(() => "---")),
    ...rows.map(line),
  ].join("\n");
}

async function main() {
  const sa = loadServiceAccount();
  const token = await getAccessToken(sa);

  // `npm run seo:sites` — answers "is the credential working, and which host is
  // the property registered under?" without pulling a full report.
  if (process.argv.includes("--list-sites")) {
    const sites = await listSites(token);
    if (!sites.length) {
      console.log(
        [
          `No Search Console properties are readable by ${sa.client_email}.`,
          "",
          "The credential itself works — this is the Search Console permission",
          "step. Add that address under Settings -> Users and permissions on the",
          "property, with Restricted access, then run this again.",
        ].join("\n"),
      );
      return;
    }
    console.log(`Properties readable by ${sa.client_email}:\n`);
    for (const site of sites) {
      console.log(`  ${site.siteUrl}  (${site.permissionLevel})`);
    }
    console.log(`\nSITE_URL is currently "${SITE_URL}".`);
    return;
  }

  const [byQuery, byPage] = await Promise.all([
    queryAnalytics(token, ["query"]),
    queryAnalytics(token, ["page"]),
  ]);

  const totalClicks = byQuery.rows.reduce((s, r) => s + r.clicks, 0);
  const totalImpressions = byQuery.rows.reduce((s, r) => s + r.impressions, 0);

  const queryRows = byQuery.rows
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 25)
    .map((r) => [
      r.keys[0],
      r.clicks,
      r.impressions,
      `${(r.ctr * 100).toFixed(1)}%`,
      r.position.toFixed(1),
    ]);

  const pageRows = byPage.rows
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 15)
    .map((r) => [
      r.keys[0].replace(SITE_URL.replace(/\/$/, ""), "") || "/",
      r.clicks,
      r.impressions,
      `${(r.ctr * 100).toFixed(1)}%`,
      r.position.toFixed(1),
    ]);

  const today = new Date().toISOString().slice(0, 10);
  const report = `# SEO / Search Console report — ${today}

Period: ${byQuery.startDate} to ${byQuery.endDate} (${DAYS} days)
Property: ${SITE_URL}

## Totals
- Clicks: ${totalClicks}
- Impressions: ${totalImpressions}
- Overall CTR: ${totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00"}%

## Top queries
${table(["Query", "Clicks", "Impressions", "CTR", "Avg. position"], queryRows.length ? queryRows : [["(no data yet)", "-", "-", "-", "-"]])}

## Top pages
${table(["Page", "Clicks", "Impressions", "CTR", "Avg. position"], pageRows.length ? pageRows : [["(no data yet)", "-", "-", "-", "-"]])}

## What to do with this
- Queries with high impressions but low CTR/position 8-20: candidates for a
  new or improved blog post targeting that exact phrase (see CLAUDE.md →
  "Weekly SEO runbook").
- Queries already ranking position 4-10: on-page tightening (title/H1/first
  paragraph should contain the exact phrase) can push them onto page 1.
- Compare this file against last week's in reports/seo/ to catch regressions
  — a page that dropped out of the top pages list lost visibility somewhere.
`;

  const outDir = join(root, "reports", "seo");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `${today}.md`);
  writeFileSync(outPath, report);
  console.log(report);
  console.log(`\nSaved to ${outPath}`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
