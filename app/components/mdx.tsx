import type { ImageProps } from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { type PropsWithChildren } from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { highlight } from "sugar-high";
import { CaptionComponent } from "./caption";
import { ImageGrid } from "./image-grid";
import { TweetComponent } from "./tweet";
import { YouTubeComponent } from "./youtube";
import "katex/dist/katex.min.css";
import { blur } from "app/lib/image/blur";
import Image from "next/image";

function CustomLink({ href, ...props }: PropsWithChildren<{ href: string }>) {
  if (href.startsWith("/")) {
    return (
      <Link {...props} href={{ href }}>
        {props.children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return <a {...props} />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

async function RoundedImage(imageProps: ImageProps) {
  const imageSrc = imageProps.src.toString();
  const blurDataURL = await blur(imageSrc);

  return (
    <figure className="flex flex-col my-4">
      <Image
        className="rounded-lg"
        placeholder="blur"
        blurDataURL={blurDataURL}
        {...imageProps}
      />
      <figcaption className="mt-2 text-sm text-gray-500 italic">
        {imageProps.alt}
      </figcaption>
    </figure>
  );
}

function Code({
  children,
  ...props
}: PropsWithChildren<Record<string, never>>) {
  const codeHTML = highlight(children as string);
  // biome-ignore lint/security/noDangerouslySetInnerHtml: this component is for printing code on the screen
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header: string, index: number) => (
    <th key={`header-${index}`}>{header}</th>
  ));
  const rows = data.rows.map((row: string[], index: number) => (
    <tr key={`row-${index}`}>
      {row.map((cell: string, cellIndex: number) => (
        <td key={`cell-${cellIndex}`}>{cell}</td>
      ))}
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr className="text-left">{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function Strikethrough(
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLModElement> &
    React.DelHTMLAttributes<HTMLModElement>
) {
  return <del {...props} />;
}

function Callout(props: { emoji: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="px-4 py-3 bg-[#F7F7F7] dark:bg-[#181818] rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout leading-relaxed">{props.children}</div>
    </div>
  );
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function createHeading(level: number) {
  const Heading = ({ children }: PropsWithChildren<Record<string, never>>) => {
    const slug = slugify(children as string);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  ImageGrid,
  a: CustomLink,
  StaticTweet: TweetComponent,
  Caption: CaptionComponent,
  YouTube: YouTubeComponent,
  code: Code,
  Table,
  del: Strikethrough,
  Callout,
};

export function CustomMDX(
  props: React.JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
