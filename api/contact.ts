import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * POST /api/contact
 *
 * Runs on the server (Vercel Function in production, Vite middleware in dev) so
 * the Apps Script URL and shared secret never reach the browser. Validates the
 * submission, then forwards it to the Apps Script web app, which appends a row
 * to the private Google Sheet.
 *
 * Deliberately written against raw node req/res rather than Vercel's helpers so
 * the same module can be mounted by the Vite dev server. See vite.config.ts.
 */

/** Vercel pre-parses the body; the Vite dev middleware does not. */
type MaybeParsedRequest = IncomingMessage & { body?: unknown };

const LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  phone: 50,
  service: 100,
  budget: 100,
  subject: 200,
  message: 5000,
  website: 200,
} as const;

const REQUIRED = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "service",
  "message",
] as const;

const MAX_BODY_BYTES = 64 * 1024;

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function readRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;

    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Request body too large."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function parseBody(req: MaybeParsedRequest): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === "object") {
    return req.body as Record<string, unknown>;
  }

  const raw = typeof req.body === "string" ? req.body : await readRawBody(req);
  if (!raw.trim()) return {};

  return JSON.parse(raw) as Record<string, unknown>;
}

function normalise(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Loose on purpose — international numbers vary wildly. */
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export default async function handler(
  req: MaybeParsedRequest,
  res: ServerResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, {
      success: false,
      message: "Method not allowed.",
    });
  }

  let body: Record<string, unknown>;
  try {
    body = await parseBody(req);
  } catch {
    return sendJson(res, 400, {
      success: false,
      message: "We could not read that submission. Please try again.",
    });
  }

  const fields = {
    firstName: normalise(body.firstName, LIMITS.firstName),
    lastName: normalise(body.lastName, LIMITS.lastName),
    email: normalise(body.email, LIMITS.email),
    phone: normalise(body.phone, LIMITS.phone),
    service: normalise(body.service, LIMITS.service),
    budget: normalise(body.budget, LIMITS.budget),
    subject: normalise(body.subject, LIMITS.subject),
    message: normalise(body.message, LIMITS.message),
  };

  // Honeypot: hidden from real visitors, filled in by naive bots. Report success
  // so the bot learns nothing, but drop the submission on the floor.
  if (normalise(body.website, LIMITS.website)) {
    return sendJson(res, 200, {
      success: true,
      message: "Your message was submitted successfully.",
    });
  }

  if (REQUIRED.some((key) => !fields[key])) {
    return sendJson(res, 400, {
      success: false,
      message: "Please complete all required fields.",
    });
  }

  if (!isValidEmail(fields.email)) {
    return sendJson(res, 400, {
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (!isValidPhone(fields.phone)) {
    return sendJson(res, 400, {
      success: false,
      message: "Please enter a valid phone number.",
    });
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const apiSecret = process.env.FORM_API_SECRET;

  if (!scriptUrl || !apiSecret) {
    console.error(
      "Contact form is missing GOOGLE_APPS_SCRIPT_URL and/or FORM_API_SECRET.",
    );
    return sendJson(res, 500, {
      success: false,
      message: "The contact form is not configured correctly.",
    });
  }

  try {
    const scriptResponse = await fetch(scriptUrl, {
      method: "POST",
      // Apps Script rejects a JSON preflight; text/plain keeps it a simple request.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: apiSecret, ...fields, website: "" }),
      redirect: "follow",
    });

    const rawResponse = await scriptResponse.text();

    let result: { success?: boolean; message?: string };
    try {
      result = JSON.parse(rawResponse) as typeof result;
    } catch {
      console.error("Unexpected Apps Script response:", rawResponse.slice(0, 500));
      return sendJson(res, 502, {
        success: false,
        message: "The form service returned an unexpected response.",
      });
    }

    if (!scriptResponse.ok || !result.success) {
      console.error("Apps Script rejected the submission:", result);
      return sendJson(res, 502, {
        success: false,
        message: "Your submission could not be saved. Please try again.",
      });
    }

    return sendJson(res, 200, {
      success: true,
      message:
        "Thank you. Your message was submitted successfully — we'll respond within one business day.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return sendJson(res, 500, {
      success: false,
      message: "Something went wrong while submitting the form. Please try again.",
    });
  }
}
