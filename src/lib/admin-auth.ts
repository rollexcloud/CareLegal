const ADMIN_USERNAME = process.env.BLOG_ADMIN_USERNAME || "owner";
const ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD;

function ensurePasswordConfigured() {
  if (!ADMIN_PASSWORD) {
    throw new Error("BLOG_ADMIN_PASSWORD env variable is not set.");
  }
}

export function assertAuthorized(formData: FormData) {
  ensurePasswordConfigured();

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!username || !password) {
    throw new Error("Username and password are required.");
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}

export function assertCredentials(username: string, password: string) {
  ensurePasswordConfigured();

  if (!username || !password) {
    throw new Error("Username and password are required.");
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
}
