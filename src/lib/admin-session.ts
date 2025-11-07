import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";

const SESSION_COOKIE_NAME = "carelegal_admin";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function credentialFingerprint() {
  const username = process.env.BLOG_ADMIN_USERNAME || "owner";
  const passwordHash = process.env.BLOG_ADMIN_PASSWORD_HASH;
  const passwordSalt = process.env.BLOG_ADMIN_PASSWORD_SALT;

  if (!passwordHash || !passwordSalt) {
    throw new Error("BLOG_ADMIN_PASSWORD_HASH or BLOG_ADMIN_PASSWORD_SALT env variable is not set.");
  }

  return createHash("sha256").update(`${username}:${passwordHash}:${passwordSalt}`).digest("hex");
}

export function establishAdminSession() {
  const store = cookies();
  store.set({
    name: SESSION_COOKIE_NAME,
    value: credentialFingerprint(),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function destroyAdminSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}

export function hasValidAdminSession(): boolean {
  const value = cookies().get(SESSION_COOKIE_NAME)?.value;
  return value === credentialFingerprint();
}

export function requireAdminSession(returnTo = "/blog/admin") {
  if (!hasValidAdminSession()) {
    const target = returnTo || "/blog/admin";
    redirect(`/blog/admin/login?returnTo=${encodeURIComponent(target)}`);
  }
}

export function assertAdminSession() {
  if (!hasValidAdminSession()) {
    throw new Error("Unauthorized");
  }
}
