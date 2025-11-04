"use server";

import { redirect } from "next/navigation";
import { assertCredentials } from "@/lib/admin-auth";
import { establishAdminSession } from "@/lib/admin-session";

export type LoginState = {
  error?: string;
};

const DEFAULT_REDIRECT = "/blog/admin";

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const requestedReturn = String(formData.get("returnTo") ?? DEFAULT_REDIRECT).trim();

  const safeReturnTo = requestedReturn.startsWith("/") ? requestedReturn : DEFAULT_REDIRECT;

  try {
    assertCredentials(username, password);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed.";
    const friendly = message === "Unauthorized" ? "Invalid username or password." : message;
    return { error: friendly };
  }

  establishAdminSession();
  redirect(safeReturnTo || DEFAULT_REDIRECT);
}
