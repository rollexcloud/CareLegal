"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login, LoginState } from "./actions";

const initialState: LoginState = {};

type LoginFormProps = {
  returnTo?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="inline-flex w-full justify-center border border-[#c7a24a]/60 bg-[#c7a24a] px-4 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#1c170a] transition hover:bg-[#e5c777] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a24a]/60 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export function LoginForm({ returnTo }: LoginFormProps) {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="returnTo" value={returnTo ?? ""} />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Username
        </label>
        <input
          name="username"
          autoComplete="username"
          className="w-full border border-[#d8c9a9] bg-white px-3 py-3 text-sm text-[#1c170a] transition focus:border-[#c7a24a] focus:outline-none focus:ring-2 focus:ring-[#c7a24a]/35 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          placeholder="Admin username"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="w-full border border-[#d8c9a9] bg-white px-3 py-3 text-sm text-[#1c170a] transition focus:border-[#c7a24a] focus:outline-none focus:ring-2 focus:ring-[#c7a24a]/35 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          placeholder="Enter password"
          required
        />
      </div>
      {state.error ? (
        <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800 dark:border-red-900/40 dark:bg-red-900/40 dark:text-red-200">
          {state.error}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}

export default LoginForm;
