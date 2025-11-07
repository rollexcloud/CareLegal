import { readBlogPosts } from "@/lib/blog-data";
import { readTeamMembers } from "@/lib/team-data";
import { requireAdminSession } from "@/lib/admin-session";
import BlogAdminPanel from "@/components/blog/BlogAdminPanel";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  if (!process.env.BLOG_ADMIN_PASSWORD_HASH || !process.env.BLOG_ADMIN_PASSWORD_SALT || !process.env.BLOG_ADMIN_USERNAME) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-32">
        <div className="mx-auto max-w-xl rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Admin password not configured
          </h1>
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Set the <code className="rounded bg-neutral-200 px-1 py-0.5 text-xs dark:bg-neutral-800">BLOG_ADMIN_USERNAME</code> and the
            hashed credentials (<code className="ml-1 rounded bg-neutral-200 px-1 py-0.5 text-xs dark:bg-neutral-800">BLOG_ADMIN_PASSWORD_HASH</code>,
            <code className="ml-1 rounded bg-neutral-200 px-1 py-0.5 text-xs dark:bg-neutral-800">BLOG_ADMIN_PASSWORD_SALT</code>) environment
            variables to enable the admin panel.
          </p>
        </div>
      </div>
    );
  }

  requireAdminSession();

  const posts = await readBlogPosts();
  const teamMembers = await readTeamMembers();
  return <BlogAdminPanel posts={posts} teamMembers={teamMembers} />;
}
