import { UpdateLastSeen } from "app/components/update-last-seen";
import { metaData } from "app/lib/config";
import { getBlogPosts, getTags } from "app/lib/posts";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const posts = getBlogPosts();
  const recent = posts
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 5);
  const title = "Blog";
  const description =
    recent.length > 0
      ? `${recent.length} articles on ${metaData.name}'s blog — ${recent[0]?.metadata.title} and more.`
      : `Articles and tutorials by ${metaData.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `${metaData.baseUrl}/blog` },
  };
}

export default function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <section>
      <UpdateLastSeen />
      <h2 className="section-heading">Blog</h2>
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
    </section>
  );
}
