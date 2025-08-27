import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";
import dayjs from "dayjs";
import { Badge } from "app/components/badge";

export const metadata = {
  title: "Blog",
  description: "erlich.dev Blog",
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">My Blog</h1>
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
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                  <h2 className="text-black dark:text-white ">
                    <span className="mr-2">{post.metadata.title}</span>
                    {isNew && <Badge label="New" />}
                  </h2>

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
