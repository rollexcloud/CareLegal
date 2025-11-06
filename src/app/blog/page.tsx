import { readBlogPosts } from "@/lib/blog-data";
import BlogList from "@/components/home/BlogList";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

const FALLBACK_IMAGE = "https://images.pexels.com/photos/442781/pexels-photo-442781.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=1";
export default async function BlogPage() {
  const posts = (await readBlogPosts()).map((post) => ({
    ...post,
    image: normalizeImageUrl(post.image, FALLBACK_IMAGE),
  }));

  return (
    <main className="bg-[#f6f1e6] pb-28 pt-28">
      <section className="mx-auto flex w/full max-w-[1140px] flex-col gap-16 px-4 sm:px-6">
        <header className="space-y-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b4975a]">Insights</p>
          <h1 className="text-[42px] font-semibold text-[#1c170a] sm:text-[48px]">Latest News & Resources</h1>
          <p className="mx-auto max-w-2xl text-[15px] leading-[1.9] text-[#5c5541]">
            Stay informed with legal perspectives, case updates, and practice highlights curated by our attorneys.
          </p>
        </header>

        {posts.length ? (
          <BlogList posts={posts} />
        ) : (
          <div className="border border-[#ede4d1] bg-white p-12 text-center text-[14px] text-[#5c5541]">
            No articles yet. Publish your first post to showcase firm insights.
          </div>
        )}
      </section>
    </main>
  );
}
