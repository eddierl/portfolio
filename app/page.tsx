import { Poem } from "app/components/poem";
import { UpdateLastSeen } from "app/components/update-last-seen";
import { calculateReadingTime, formatDate, getBlogPosts } from "app/lib/posts";
import dayjs from "dayjs";
import Link from "next/link";
import { FiClock } from "react-icons/fi";

export default function Page() {
  const allBlogs = getBlogPosts().slice(0, 2);

  return (
    <section className="hero">
      <h1 className="mb-6">
        Hi, I&apos;m Eddie!{" "}
        <span className="inline-block animate-wave">👋</span>
      </h1>
      <p className="lede mt-3">
        Senior software engineer with 10+ years of experience, transitioning
        into AI-powered application development. I care about{" "}
        <strong className="text-accent">things that actually work</strong>.
      </p>
      <Poem className="mt-4 mb-10" />

      {allBlogs.length > 0 && (
        <>
          <UpdateLastSeen />
          <h2 className="section-heading mt-10">Recent Posts</h2>
          <div className="space-y-4">
            {allBlogs
              .sort((a, b) => {
                if (
                  new Date(a.metadata.publishedAt) >
                  new Date(b.metadata.publishedAt)
                ) {
                  return -1;
                }
                return 1;
              })
              .map((post) => {
                const postDate = dayjs(post.metadata.publishedAt);
                const isNew = postDate.isAfter(dayjs().subtract(1, "week"));

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="card block"
                  >
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between sm:space-x-4 sm:space-y-0">
                      <div className="flex flex-col space-y-1">
                        <h3 className="font-medium text-text text-lg">
                          {post.metadata.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="blog-meta">
                            <FiClock className="size-3.5" aria-hidden="true" />
                            {calculateReadingTime(post.content)} min read
                          </span>
                          {isNew && <span className="badge-new">New</span>}
                        </div>
                      </div>

                      <p className="blog-meta whitespace-nowrap tabular-nums">
                        {formatDate(post.metadata.publishedAt, false)}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </section>
  );
}
