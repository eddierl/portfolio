import { BlogFilter } from "app/components/blog-filter";
import { BlogPostCard } from "app/components/blog-post-card";
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
  const allTags = getTags();
  const allBlogs = getBlogPosts();

  return (
    <section>
      <UpdateLastSeen />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: I guess this is need for application/ld+json
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog",
            description: `Articles and tutorials by ${metaData.name}.`,
            url: metaData.baseUrl,
            blogPost: getBlogPosts()
              .slice(0, 10)
              .map((post) => ({
                "@type": "BlogPosting",
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                url: `${metaData.baseUrl}/blog/${post.slug}`,
              })),
          }),
        }}
      />
      <div className="mb-6">
        <h2 className="section-heading">Blog</h2>
      </div>

      <BlogFilter
        allTags={allTags}
        allBlogs={allBlogs}
        BlogPostCard={BlogPostCard}
      />
    </section>
  );
}
