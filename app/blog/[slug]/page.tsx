import { CustomMDX } from "app/components/mdx";
import { TagBadge } from "app/components/tag-badge";
import { metaData } from "app/lib/config";
import { getBlogPosts } from "app/lib/posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiClock } from "react-icons/fi";
import { calculateReadingTime, formatDate } from "@/app/lib/date-utils";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    tags,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    keywords: tags,
    alternates: { canonical: `${metaData.baseUrl}/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
      tags: tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
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
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${metaData.baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${metaData.baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: metaData.name,
            },
            keywords: post.tags.join(", "),
          }),
        }}
      />
      <div className="card">
        <h1 className="title mb-3 font-medium text-2xl">
          {post.metadata.title}
        </h1>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-neutral-500 text-sm dark:text-neutral-400">
          <span>{formatDate(post.metadata.publishedAt)}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <FiClock aria-hidden="true" />
            {calculateReadingTime(post.content)} min read
          </span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                href={`/blog/tags?tag=${encodeURIComponent(tag)}`}
              />
            ))}
          </div>
        )}
        <article className="prose prose-quoteless prose-neutral dark:prose-invert">
          <CustomMDX source={post.content} />
        </article>
      </div>
    </section>
  );
}
