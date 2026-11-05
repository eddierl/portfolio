import { UpdateLastSeen } from "app/components/update-last-seen";
import { socialLinks } from "app/lib/config";
import { formatDate } from "app/lib/date-utils";
import type { Metadata } from "next";
import Image from "next/image";
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

      <div className="mt-4 flex gap-4">
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-accent hover:text-accent-dim transition-colors"
        >
          <Image
            src="/icons/github-original.svg"
            alt="GitHub"
            width={24}
            height={24}
          />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-accent hover:text-accent-dim transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <title>LinkedIn</title>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v5.787H20.447zM5.337 7.433a2.062 2.062 0 01-2.133-1.915 2.128 2.128 0 112.133 1.915zm1.78 13.019H3.555V9h3.562v11.452zM13.555 9H17.1v11.452h-3.545V9z" />
          </svg>
        </a>
        <a
          href={socialLinks.email}
          aria-label="Email"
          className="text-accent hover:text-accent-dim transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <title>Email</title>
            <path d="M1.5 8a2 2 0 012-2h17a2 2 0 012 2v8a2 2 0 01-2 2h-4l-3.2 2.4a.5.5 0 01-.8 0L6 18H3.5a2 2 0 01-2-2V8zm2 0v.2l5.35 4a.5.5 0 00.5 0L16.5 8.2V8a.5.5 0 00-.5-.5H3.5a.5.5 0 00-.5.5zm17 1.5L14.35 12a1.5 1.5 0 01-1.5 0L6 9.5V16h12.5V9.5z" />
          </svg>
        </a>
      </div>

      {/* Featured Projects */}
      <h2 className="section-heading mt-10">Featured Projects</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/projects" className="card block">
          <div className="p-4">
            <h3 className="font-medium text-lg">View All Projects →</h3>
            <p className="mt-1 text-sm text-dim">
              Tic-Tac-Toe · Portfolio · DocFlow
            </p>
          </div>
        </Link>
      </div>

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
