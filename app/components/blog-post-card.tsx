"use client";

import { TagBadge } from "app/components/tag-badge";
import { calculateReadingTime, formatDate } from "app/lib/date-utils";
import type { BlogPost } from "app/lib/post-types";
import Link from "next/link";
import { FiClock } from "react-icons/fi";

interface BlogPostCardProps {
  post: BlogPost;
  isNew: boolean;
  tagHref?: string;
}

export function BlogPostCard({ post, isNew, tagHref }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="card block">
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
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {post.tags.slice(0, 8).map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  href={
                    tagHref
                      ? `/blog/tags?tag=${encodeURIComponent(tag)}`
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </div>

        <p className="blog-meta whitespace-nowrap tabular-nums">
          {formatDate(post.metadata.publishedAt, false)}
        </p>
      </div>
    </Link>
  );
}
