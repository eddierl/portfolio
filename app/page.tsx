import { UpdateLastSeen } from "app/components/update-last-seen";
import { formatDate } from "app/lib/date-utils";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostsMetadata } from "@/app/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.erlich.dev" },
};

export default async function Page() {
  const technicalPosts = (await getPostsMetadata())
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 2);

  return (
    <section className="hero">
      {/* Hero */}
      <h1 className="mb-3">
        Hi, I&apos;m Eddie!{" "}
        <span className="inline-block animate-wave">👋</span>
      </h1>
      <p className="mb-1 text-lg text-dim">
        Senior Frontend Engineer · 10+ years
      </p>
      <p className="lede">
        I build scalable web &amp; mobile applications with React, TypeScript,
        Next.js, and clean functional programming. I care about{" "}
        <strong className="text-accent whitespace-nowrap">
          things that actually work
        </strong>
        .
      </p>
      {/* Writing */}
      {technicalPosts.length > 0 && (
        <>
          <UpdateLastSeen />
          <h2 className="section-heading mt-10">Writing</h2>
          <div className="space-y-4">
            {technicalPosts.map((post) => {
              const postDate = new Date(post.metadata.publishedAt);
              const isNew =
                postDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card block"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-1">
                      <h3 className="font-medium text-text text-lg">
                        {post.metadata.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="blog-meta">
                          {formatDate(post.metadata.publishedAt, false)}
                        </span>
                        {isNew && <span className="badge-new">New</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
