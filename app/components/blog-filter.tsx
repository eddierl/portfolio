"use client";

import { TagBadge } from "app/components/tag-badge";
import type { BlogPost } from "app/lib/post-types";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

interface BlogFilterProps {
  allTags: string[];
  allBlogs: BlogPost[];
  BlogPostCard: React.ComponentType<{
    post: BlogPost;
    isNew: boolean;
    tagHref?: string;
  }>;
}

export function BlogFilter({
  allTags,
  allBlogs,
  BlogPostCard,
}: BlogFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const sortedPosts = useMemo(() => {
    let posts = allBlogs;

    if (selectedTag) {
      posts = posts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()),
      );
    }

    return [...posts].sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    });
  }, [allBlogs, selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleClearFilter = () => {
    setSelectedTag(null);
  };

  return (
    <>
      {selectedTag && (
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={handleClearFilter}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20"
          >
            ✕ Clear filter
          </button>
          <TagBadge tag={selectedTag} size="md" />
        </div>
      )}

      {sortedPosts.length > 0 ? (
        <div className="space-y-4">
          {sortedPosts.map((post) => {
            const postDate = dayjs(post.metadata.publishedAt);
            const isNew = postDate.isAfter(dayjs().subtract(1, "week"));

            return (
              <BlogPostCard
                key={post.slug}
                post={post}
                isNew={isNew}
                tagHref={
                  selectedTag
                    ? `/blog/tags?tag=${encodeURIComponent(selectedTag)}`
                    : undefined
                }
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found with this tag.</p>
        </div>
      )}

      {!selectedTag && (
        <div className="mt-12">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Browse by tag
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
