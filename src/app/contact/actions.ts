"use server";

import { headers } from "next/headers";
import { sendTransactionalEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 4000;
const MIN_MESSAGE_LENGTH = 40;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 3;

function getClientIdentifier(): string {
  const headerList = headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  const realIp = headerList.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return headerList.get("remote-addr") || "unknown";
}

type RateLimitEntry = {
  timestamps: number[];
};

declare global {
  // eslint-disable-next-line no-var
  var __contactRateLimit: Map<string, RateLimitEntry> | undefined;
}

const rateLimitStore = (globalThis.__contactRateLimit ??= new Map<string, RateLimitEntry>());

function isRateLimited(key: string, now = Date.now()) {
  const entry = rateLimitStore.get(key) ?? { timestamps: [] };
  const filtered = entry.timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (filtered.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    rateLimitStore.set(key, { timestamps: filtered });
    return true;
  }
  filtered.push(now);
  rateLimitStore.set(key, { timestamps: filtered });
  return false;
}

function sanitize(input: unknown): string {
  return String(input ?? "").trim();
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export type ContactSubmissionResult =
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContact(formData: FormData): Promise<ContactSubmissionResult> {
  const name = sanitize(formData.get("name"));
  const email = sanitize(formData.get("email"));
  const phone = sanitize(formData.get("phone"));
  const matter = sanitize(formData.get("matter"));
  const message = sanitize(formData.get("message"));
  const privacyConsent = formData.get("privacy") === "on";
  const honeypot = sanitize(formData.get("company"));

  if (honeypot) {
    return { status: "success" }; // silently ignore bot submission
  }

  if (!name || name.length < 3) {
    return { status: "error", message: "Please provide your full name." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (!privacyConsent) {
    return { status: "error", message: "Please accept the privacy acknowledgement." };
  }

  if (!message || message.length < MIN_MESSAGE_LENGTH) {
    return { status: "error", message: "Please share a brief overview so we can prepare for the consultation." };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { status: "error", message: "Message is too long. Please shorten it to under 4000 characters." };
  }

  const clientId = getClientIdentifier();
  if (isRateLimited(clientId)) {
    return { status: "error", message: "You have submitted multiple requests recently. Please try again in a few minutes." };
  }

  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMatter = escapeHtml(matter);

  try {
    await sendTransactionalEmail({
      subject: `New consultation request from ${safeName}`,
      html: `
        <h2 style="margin:0 0 16px;font-size:18px;font-family:Arial,sans-serif;">New enquiry from Care Legal contact form</h2>
        <p style="margin:0 0 8px;font-size:14px;">You have received a new consultation request.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;font-family:Arial,sans-serif;">
          <tbody>
            <tr>
              <td style="padding:6px 0;font-weight:600;width:140px;">Name:</td>
              <td>${safeName}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:600;">Email:</td>
              <td>${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:600;">Phone:</td>
              <td>${safePhone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:600;">Matter:</td>
              <td>${safeMatter || "Not provided"}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin:16px 0 0;font-size:14px;">
          <p style="margin:0 0 6px;font-weight:600;">Message:</p>
          <p style="margin:0;line-height:1.6;">${safeMessage}</p>
        </div>
      `,
      text: `New enquiry from ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nMatter: ${matter || "Not provided"}\n\nMessage:\n${message}`,
    });
    return { status: "success" };
  } catch (error) {
    console.error("Failed to send contact email", error);
    return {
      status: "error",
      message: "We weren't able to submit your request. Please try again shortly or reach us by phone.",
    };
  }
}
