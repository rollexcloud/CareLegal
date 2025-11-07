import { scryptSync, timingSafeEqual } from "crypto";

const ADMIN_USERNAME = process.env.BLOG_ADMIN_USERNAME || "owner";
const PASSWORD_HASH = process.env.BLOG_ADMIN_PASSWORD_HASH;
const PASSWORD_SALT = process.env.BLOG_ADMIN_PASSWORD_SALT;

function ensureCredentialsConfigured() {
  if (!PASSWORD_HASH || !PASSWORD_SALT) {
    throw new Error("BLOG_ADMIN_PASSWORD_HASH or BLOG_ADMIN_PASSWORD_SALT env variable is not set.");
  }
}

function verifyPassword(password: string) {
  ensureCredentialsConfigured();

  const derived = scryptSync(password, PASSWORD_SALT as string, 64);
  const expected = Buffer.from(PASSWORD_HASH as string, "hex");

  if (expected.length !== derived.length || !timingSafeEqual(expected, derived)) {
    throw new Error("Unauthorized");
  }
}

function validateInputs(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Username and password are required.");
  }
}

export function assertAuthorized(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  validateInputs(username, password);

  if (username !== ADMIN_USERNAME) {
    throw new Error("Unauthorized");
  }

  verifyPassword(password);
}

export function assertCredentials(username: string, password: string) {
  validateInputs(username, password);

  if (username !== ADMIN_USERNAME) {
    throw new Error("Unauthorized");
  }

  verifyPassword(password);
}
