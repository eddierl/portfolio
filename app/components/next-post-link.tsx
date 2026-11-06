import { getPosts } from "app/lib/blog";
import Link from "next/link";

export async function NextPostLink({ currentSlug }: { currentSlug: string }) {
  const posts = await getPosts();
  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);
  const nextPost = posts.at(currentIndex - 1);

  if (!nextPost) return null;

  return (
    <div className="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-700">
      <Link
        href={`/blog/${nextPost.slug}`}
        className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-accent dark:text-neutral-400 dark:hover:text-accent"
      >
        <span className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Previous Post
        </span>
        <span className="font-medium">{nextPost.metadata.title}</span>
        <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
          →
        </span>
      </Link>
    </div>
  );
}
