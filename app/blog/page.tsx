import { Badge } from "app/components/badge";
import { UpdateLastSeen } from "app/components/update-last-seen";
import { calculateReadingTime, formatDate, getBlogPosts } from "app/lib/posts";
import dayjs from "dayjs";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
export const metadata = {
  title: "Blog",
  description: "erlich.dev Blog",
};

export default function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <section>
      <UpdateLastSeen />
      <div>
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
                className="mb-5 flex flex-col space-y-1 transition-opacity duration-200 hover:opacity-80"
                href={`/blog/${post.slug}`}
              >
                <div className="flex w-full flex-col items-start justify-between space-y-1 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-black dark:text-white">
                      {post.metadata.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800">
                        <FiClock aria-hidden="true" />
                        {calculateReadingTime(post.content)} min
                      </span>
                      {isNew && <Badge label="New" />}
                    </div>
                  </div>

                  <p className="text-neutral-600 text-sm tabular-nums dark:text-neutral-400">
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
