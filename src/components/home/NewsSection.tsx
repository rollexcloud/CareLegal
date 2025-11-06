import { readBlogPosts } from "@/lib/blog-data";
import Image from "next/image";

const FALLBACK_IMAGE = "https://images.pexels.com/photos/442781/pexels-photo-442781.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=1";

function formatDate(input: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(input));
  } catch (error) {
    return input;
  }
}

async function NewsSection() {
  const posts = await readBlogPosts();
  const featured = posts.slice(0, 3);

  return (
    <section id="news" className="bg-secondary py-24">
      <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-10 px-4 sm:px-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-primary">Insights</p>
          <h2 className="text-[34px] font-semibold text-foreground sm:text-[44px]">
            Latest updates and resources
          </h2>
          <p className="text-[15px] leading-[1.9] text-muted-foreground">
            Summaries from recent matters, regulatory shifts, and practice highlights curated for clients.
          </p>
        </div>

        {featured.length ? (
          <div className="grid gap-8 rounded-[40px] border border-border bg-white p-10 shadow-sm md:grid-cols-3">
            {featured.map(({ id, title, description, date, image }) => (
              <article key={id} className="space-y-5 text-left">
                <div className="relative h-52 w-full overflow-hidden rounded-[30px] bg-secondary">
                  <Image
                    src={image || FALLBACK_IMAGE}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    {formatDate(date)}
                  </p>
                  <h3 className="text-[20px] font-semibold text-foreground">{title}</h3>
                  <p className="text-[14px] leading-[1.8] text-muted-foreground">
                    {description}
                  </p>
                </div>
                <div>
                  <a
                    href="/contact"
                    className="inline-flex items-center text-[12px] font-semibold uppercase tracking-[0.35em] text-primary underline underline-offset-8"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[32px] border border-border bg-white p-10 text-[14px] text-muted-foreground shadow-sm">
            New insights will appear here soon. Check back shortly for updates from chambers.
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;
