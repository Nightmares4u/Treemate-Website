#!/usr/bin/env bash
#
# One-time setup for the Search Console reporting credential used by
# scripts/seo/gsc-report.mjs.
#
# This automates everything on the Google Cloud side: creating the project,
# enabling the Search Console API, creating a service account, and issuing a
# JSON key. Two steps it cannot do for you are printed at the end, because
# Google exposes no API for either:
#
#   1. Granting the service account read access to the Search Console
#      property. There is no permissions API for Search Console — it is a
#      Settings -> Users and permissions screen, and it must be a human click.
#   2. Storing the key as a GitHub Actions secret, if you want the weekly
#      workflow to run. The command to do that is printed for you.
#
# Prerequisites:
#   - gcloud CLI:  brew install --cask google-cloud-sdk
#   - Logged in:   gcloud auth login
#     (must be the Google account that owns the treemate.us Search Console
#      property, or one with access to it)
#
# Usage:
#   ./scripts/seo/setup-gsc.sh
#
# Safe to re-run: every step below is idempotent and skips work already done.
set -euo pipefail

PROJECT_ID="${GSC_PROJECT_ID:-treemate-seo}"
SA_NAME="${GSC_SA_NAME:-gsc-reporter}"
KEY_DIR="${GSC_KEY_DIR:-$HOME/.secrets/treemate}"
KEY_PATH="$KEY_DIR/gsc-service-account.json"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

say() { printf '\n\033[1m==> %s\033[0m\n' "$1"; }

command -v gcloud >/dev/null 2>&1 || {
  echo "gcloud not found. Install it with:  brew install --cask google-cloud-sdk" >&2
  exit 1
}

ACCOUNT="$(gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null || true)"
if [ -z "$ACCOUNT" ]; then
  echo "No active gcloud account. Run:  gcloud auth login" >&2
  echo "Use the Google account that owns the treemate.us Search Console property." >&2
  exit 1
fi
say "Authenticated as $ACCOUNT"

say "Ensuring project '$PROJECT_ID' exists"
if gcloud projects describe "$PROJECT_ID" >/dev/null 2>&1; then
  echo "Project already exists — reusing it."
else
  gcloud projects create "$PROJECT_ID" --name="Treemate SEO"
fi

say "Enabling the Search Console API"
# Free, read-only API — no billing account required on the project.
gcloud services enable searchconsole.googleapis.com --project="$PROJECT_ID"

say "Ensuring service account '$SA_EMAIL' exists"
if gcloud iam service-accounts describe "$SA_EMAIL" --project="$PROJECT_ID" >/dev/null 2>&1; then
  echo "Service account already exists — reusing it."
else
  # No project-level IAM roles needed: the only access this identity requires
  # is granted inside Search Console itself, in the manual step below.
  gcloud iam service-accounts create "$SA_NAME" \
    --project="$PROJECT_ID" \
    --display-name="Search Console reporter (treemate.us)"
fi

if [ -f "$KEY_PATH" ]; then
  say "Key already present at $KEY_PATH — leaving it alone"
  echo "Delete that file first if you want to issue a fresh key."
else
  say "Creating a JSON key at $KEY_PATH"
  mkdir -p "$KEY_DIR"
  chmod 700 "$KEY_DIR"
  gcloud iam service-accounts keys create "$KEY_PATH" \
    --iam-account="$SA_EMAIL" \
    --project="$PROJECT_ID"
  chmod 600 "$KEY_PATH"
fi

say "Writing the local env var into .env.local"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="$REPO_ROOT/.env.local"
touch "$ENV_FILE"
if grep -q '^GSC_SERVICE_ACCOUNT_KEY_FILE=' "$ENV_FILE" 2>/dev/null; then
  echo "GSC_SERVICE_ACCOUNT_KEY_FILE already set in .env.local — leaving it alone."
else
  printf '\n# Written by scripts/seo/setup-gsc.sh\nGSC_SERVICE_ACCOUNT_KEY_FILE=%s\n' "$KEY_PATH" >> "$ENV_FILE"
  echo "Added GSC_SERVICE_ACCOUNT_KEY_FILE to .env.local (git-ignored)."
fi

cat <<EOF

────────────────────────────────────────────────────────────────────────
Google Cloud side is done. Two steps remain that no API can perform.

STEP 1 — grant the service account access to the property (required)

  Go to:  https://search.google.com/search-console

  Pick the treemate.us property in the switcher at the top left, then go to
  Settings -> Users and permissions -> Add user. Paste this address and set
  permission to "Restricted":

      $SA_EMAIL

  If the switcher lists BOTH an apex and a www property, add the address to
  both — 'npm run seo:sites' will then show which one actually holds the data,
  which is the open question recorded in CLAUDE.md under "Canonical host".

  Until this is done the API can authenticate but sees no properties at all.

STEP 2 — store the key for the weekly GitHub Actions run (optional)

  gh secret set GSC_SERVICE_ACCOUNT_JSON \\
    --repo Nightmares4u/Treemate-Website \\
    < "$KEY_PATH"

Then confirm the whole chain works:

  npm run seo:sites     # lists the properties this account can read
  npm run seo:report    # pulls the actual performance data

Run seo:sites first. It confirms the key works and shows which host the
property is registered under — "https://treemate.us/", "https://www.treemate.us/"
and "sc-domain:treemate.us" are three separate properties, and only the right
one returns data. If it lists a host other than the default, set SITE_URL in
.env.local to match.

The key itself lives at $KEY_PATH, outside the repo. Treat it like a
password: anyone holding it can read this site's Search Console data.
────────────────────────────────────────────────────────────────────────
EOF
