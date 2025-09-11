import Link from "next/link";
import { formatDate, getBlogPosts, calculateReadingTime } from "app/lib/posts";
import { FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import { Badge } from "app/components/badge";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { UpdateLastSeen } from "app/components/update-last-seen";
export const metadata = {
  title: "Blog",
  description: "erlich.dev Blog",
};

export default function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">My Blog</h1>
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
                className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
                href={`/blog/${post.slug}`}
              >
                <div className="w-full flex flex-col sm:flex-row justify-between items-start space-y-1 sm:space-y-0 sm:space-x-2">
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-black dark:text-white">
                      {post.metadata.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      {isNew && <Badge label="New" />}
                      <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded inline-flex items-center gap-1">
                        <FiClock aria-hidden="true" />
                        {calculateReadingTime(post.content)} min
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
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
