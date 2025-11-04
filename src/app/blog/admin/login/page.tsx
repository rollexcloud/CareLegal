import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login | CareLegal",
};

type LoginPageProps = {
  searchParams: {
    returnTo?: string;
  };
};

export default function BlogAdminLoginPage({ searchParams }: LoginPageProps) {
  const returnTo = searchParams?.returnTo;

  if (!process.env.BLOG_ADMIN_PASSWORD || !process.env.BLOG_ADMIN_USERNAME) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-32">
        <div className="mx-auto max-w-xl rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Admin password not configured
          </h1>
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Set the <code className="rounded bg-neutral-200 px-1 py-0.5 text-xs dark:bg-neutral-800">BLOG_ADMIN_USERNAME</code> and
            <code className="ml-1 rounded bg-neutral-200 px-1 py-0.5 text-xs dark:bg-neutral-800">BLOG_ADMIN_PASSWORD</code> environment
            variables to enable the admin panel.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-24">
      <div className="mx-auto max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Admin sign in</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Enter your credentials to access the blog and team management dashboard.
        </p>
        <div className="mt-8">
          <LoginForm returnTo={returnTo} />
        </div>
      </div>
    </main>
  );
}
