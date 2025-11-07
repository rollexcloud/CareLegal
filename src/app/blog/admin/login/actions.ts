"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { assertCredentials } from "@/lib/admin-auth";
import { establishAdminSession } from "@/lib/admin-session";
import { enforceRateLimit } from "@/lib/rate-limit";
import { sendSecurityAlert } from "@/lib/security-alerts";

const RATE_LIMIT_CONFIG = {
  windowMs: 60_000,
  max: 5,
  blockDurationMs: 15 * 60_000,
} as const;

export type LoginState = {
  error?: string;
};

const DEFAULT_REDIRECT = "/blog/admin";

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const requestHeaders = headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rateKey = `admin-login:${ip}`;
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const requestedReturn = String(formData.get("returnTo") ?? DEFAULT_REDIRECT).trim();

  const safeReturnTo = requestedReturn.startsWith("/") ? requestedReturn : DEFAULT_REDIRECT;

  const rateResult = enforceRateLimit(rateKey, RATE_LIMIT_CONFIG);
  if (!rateResult.success) {
    console.warn("Admin login rate limit triggered", { ip, retryAfterMs: rateResult.retryAfterMs });
    await sendSecurityAlert({ type: "rate_limited", username, ip, retryAfterMs: rateResult.retryAfterMs });
    return { error: "Too many attempts. Please try again shortly." };
  }

  try {
    assertCredentials(username, password);
    console.info("Admin login success", { username, ip });
    await sendSecurityAlert({ type: "login_success", username, ip });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    const friendly = message === "Unauthorized" ? "Invalid username or password." : message;
    if (message === "Unauthorized") {
      console.warn("Admin login failed", { username, ip });
      await sendSecurityAlert({ type: "login_failure", username, ip });
    } else {
      console.error("Admin login error", { username, ip, message });
    }
    return { error: friendly };
  }

  establishAdminSession();
  redirect(safeReturnTo || DEFAULT_REDIRECT);
}
