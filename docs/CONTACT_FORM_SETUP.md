# Contact form → Google Sheet setup

The submission path:

```
Visitor submits the form on /contact
        ↓
POST /api/contact        (our server — validates, adds the secret)
        ↓
Apps Script /exec URL    (checks the secret, sanitises)
        ↓
A new row in the private "Leads" sheet
```

The visitor never leaves the site, no email client opens, and the Apps Script URL
and secret never reach the browser.

> **Note:** this site is **Vite + React**, not Next.js. The server route lives at
> `api/contact.ts` (a Vercel Function), not `app/api/contact/route.ts`. In local
> development the same file is mounted by a small Vite middleware, so `npm run dev`
> exercises exactly the same code as production.

---

## Part 1 — The spreadsheet

1. Open the Google Sheet you created and rename it **Treemate Website Leads**.
2. That's all the manual setup needed. `setupSheet()` in Part 2 creates the
   `Leads` tab, the header row, the column widths, and the Status dropdown.

For reference, the columns it creates are:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Date | First Name | Last Name | Email | Phone | Service | Budget | Subject | Message | Source | Status |

`Status` is a dropdown: `New`, `Contacted`, `Qualified`, `Closed`, `Spam`.

Keep the sheet's general access on **Restricted**. Do not publish it.

---

## Part 2 — The Apps Script

1. In the sheet: **Extensions → Apps Script**.
2. Rename the project **Treemate Contact Form Handler**.
3. Delete everything in `Code.gs` and paste in the contents of
   [`google-apps-script/Code.gs`](../google-apps-script/Code.gs) from this repo.
4. Click **Save**.
5. In the function dropdown at the top, select **setupSheet**, then click **Run**.
   Approve the permission prompt when it appears (see Part 4, step 2 — it's the
   same "unverified app" flow). This builds the `Leads` tab.

---

## Part 3 — The shared secret

The secret stops anyone who discovers the `/exec` URL from writing rows.

1. Generate one. In PowerShell:

   ```powershell
   [guid]::NewGuid().ToString("N")
   ```

   Use the value it prints — not an example from any doc.

2. In the Apps Script editor: **Project Settings → Script Properties →
   Add script property**:

   | Property | Value |
   |---|---|
   | `API_SECRET` | *your generated secret* |

3. Click **Save script properties**.

4. Still in Project Settings, set the timezone to
   **(GMT+05:00) Pakistan Standard Time – Karachi** so the `Date` column reads
   in local time.

---

## Part 4 — Deploy the web app

1. **Deploy → New deployment**. Click the gear beside *Select type* → **Web app**.
   - Description: `Treemate contact form production endpoint`
   - Execute as: **Me**
   - Who has access: **Anyone**
2. Click **Deploy**. Google will warn that the app is not verified — that is
   expected for your own unpublished script. Click **Advanced → Go to Treemate
   Contact Form Handler → Allow**.
3. Copy the web app URL. It must end in **`/exec`**, never `/dev`:

   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

You can paste that URL into a browser to sanity-check it: a live deployment
answers with `{"success":true,"message":"Treemate contact endpoint is live."}`.

---

## Part 5 — Local environment variables

Copy `.env.example` to `.env.local` in the project root and fill it in:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
FORM_API_SECRET=the-same-secret-you-saved-in-apps-script
```

`FORM_API_SECRET` must match the Apps Script `API_SECRET` **exactly**.

Never prefix these with `VITE_`. Anything prefixed `VITE_` is compiled into the
JavaScript bundle and readable by any visitor. `.env.local` is already gitignored.

Restart the dev server — env vars are only read at startup:

```bash
npm run dev
```

Then submit the form at <http://localhost:5173/contact> and confirm a row lands
in the sheet.

---

## Part 6 — Vercel environment variables

1. Vercel → your project → **Settings → Environment Variables**.
2. Add `GOOGLE_APPS_SCRIPT_URL` and `FORM_API_SECRET` with the same values.
3. Tick **Production**, **Preview**, and **Development** for both.
4. Save, then redeploy.

---

## Updating the Apps Script later

Saving `Code.gs` does **not** update the live deployment. After any edit:

**Deploy → Manage deployments →** pencil icon **→ Version: New version → Deploy**.

The `/exec` URL stays the same.

---

## Troubleshooting

Open DevTools (`F12`) → **Network** → submit → click the `contact` request →
**Response**.

| Response message | Cause |
|---|---|
| `Please complete all required fields.` | First name, last name, email, phone, service, or message was empty. |
| `Please enter a valid email address.` | Failed the email format check. |
| `Please enter a valid phone number.` | Fewer than 7 or more than 15 digits. |
| `The contact form is not configured correctly.` | `GOOGLE_APPS_SCRIPT_URL` or `FORM_API_SECRET` is missing. Check `.env.local`, restart the dev server. |
| `The form service returned an unexpected response.` | Apps Script returned HTML instead of JSON — usually a `/dev` URL, access not set to *Anyone*, or authorization never completed. |
| `Your submission could not be saved.` | Apps Script rejected it. Most often the secret mismatch (`Unauthorized request.`) — check the server logs. |

The precise Apps Script error is in the server log, not the browser: `vercel logs`
in production, or the terminal running `npm run dev` locally.

Apps Script's own history is under **Executions** in the left sidebar of the editor.
