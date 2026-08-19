import { TagBadge } from "app/components/tag-badge";
import { getPostsByTag, getTagCount, getTags } from "app/lib/posts";
import dayjs from "dayjs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiClock } from "react-icons/fi";
import type { BlogPost } from "@/app/lib/post-types";
import { metaData } from "../../lib/config";

interface TagsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export async function generateMetadata({
  searchParams,
}: TagsPageProps): Promise<Metadata> {
  const { tag } = await searchParams;
  const baseTitle = "Blog Tags";
  const baseDesc = "Browse blog posts by tag";
  const canonical = `${metaData.baseUrl}/blog/tags`;

  if (tag) {
    return {
      title: `Posts tagged: ${tag}`,
      description: `Blog posts tagged with ${tag}`,
      alternates: { canonical: `${canonical}?tag=${encodeURIComponent(tag)}` },
    };
  }

  return {
    title: baseTitle,
    description: baseDesc,
    alternates: { canonical },
  };
}

function TagPostCard({ post }: { post: BlogPost }) {
  const postDate = dayjs(post.metadata.publishedAt);
  const isNew = postDate.isAfter(dayjs().subtract(1, "week"));

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
              {post.content
                .replace(/```[\s\S]*?```/g, "")
                .replace(/`[^`]*`/g, "")
                .replace(/<[^>]*>/g, "")
                .split(/\s+/)
                .filter((w) => w.length > 0).length / 175}{" "}
              min read
            </span>
            {isNew && <span className="badge-new">New</span>}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>

        <p className="blog-meta whitespace-nowrap tabular-nums">
          {post.metadata.publishedAt}
        </p>
      </div>
    </Link>
  );
}

export default async function TagsPage({ searchParams }: TagsPageProps) {
  const { tag } = await searchParams;
  const allTags = getTags();

  if (tag) {
    const posts = getPostsByTag(decodeURIComponent(tag));
    if (posts.length === 0) {
      notFound();
    }

    const sortedPosts = [...posts].sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    });

    return (
      <section>
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-primary hover:underline text-sm mb-2 inline-block"
          >
            ← Back to all posts
          </Link>
          <h2 className="section-heading">
            Posts tagged: <TagBadge tag={decodeURIComponent(tag)} size="md" />
          </h2>
        </div>
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <TagPostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: I guess this is need for application/ld+json
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog Tags",
            description: "Browse blog posts organized by tag.",
            url: `${metaData.baseUrl}/blog/tags`,
            about: {
              "@type": "DefinedTermSet",
              terms: allTags.map((t) => ({
                "@type": "DefinedTerm",
                name: t,
                inDefinedTermSet: {
                  "@type": "DefinedTermSet",
                  name: "Blog Tags",
                },
              })),
            },
          }),
        }}
      />
      <h2 className="section-heading">Blog Tags</h2>
      <p className="text-muted-foreground mb-6">
        Browse all blog posts organized by tag.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/blog/tags?tag=${encodeURIComponent(t)}`}
            className="card block hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <TagBadge tag={t} size="md" />
              <span className="text-muted-foreground text-sm">
                {getTagCount(t)} post{getTagCount(t) !== 1 ? "s" : ""}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
