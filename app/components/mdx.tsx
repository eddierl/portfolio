import type { ImageProps } from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { type ComponentProps, type PropsWithChildren } from "react";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

import { highlight } from "sugar-high";
import { CaptionComponent } from "./caption";
import { ImageGrid } from "./image-grid";
import { TweetComponent } from "./tweet";
import { YouTubeComponent } from "./youtube";
import "katex/dist/katex.min.css";
import Image from "next/image";
import { getBlurBuffer, getSharpImage } from "@/app/lib/image";

function CustomLink({ href, ...props }: PropsWithChildren<{ href: string }>) {
  if (href.startsWith("/")) {
    return (
      <Link {...props} href={{ pathname: href }}>
        {props.children}
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...props} />;
}

async function RoundedImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const imageSrc = src.toString();

  try {
    const instance = getSharpImage(imageSrc);

    const [metadata, blurBuffer] = await Promise.all([
      instance.metadata(),
      getBlurBuffer(instance),
    ]);

    const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString(
      "base64",
    )}`;

    return (
      <_Figure alt={alt}>
        <Image
          className="rounded-lg"
          placeholder="blur"
          blurDataURL={blurDataURL}
          width={metadata.width}
          height={metadata.height}
          src={src}
          alt={alt}
          {...rest}
        />
      </_Figure>
    );
  } catch (error) {
    console.warn("mdx-image", error);
    return (
      <_Figure alt={alt}>
        <img src={imageSrc} alt={alt} className="rounded-lg" />
      </_Figure>
    );
  }
}

const _YTC = ({ alt, ...props }: ComponentProps<typeof YouTubeComponent>) => (
  <_Figure alt={alt}>
    <YouTubeComponent {...props} />
  </_Figure>
);
const _Figure = ({
  children,
  alt,
}: {
  children: React.ReactNode;
  alt: string;
}) => {
  return (
    <figure className="my-4 flex flex-col">
      {children}
      <figcaption className="mt-2 text-gray-500 text-sm italic">
        {alt}
      </figcaption>
    </figure>
  );
};
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
    React.DelHTMLAttributes<HTMLModElement>,
) {
  return <del {...props} />;
}

function Callout(props: { emoji: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center rounded bg-[#F7F7F7] p-1 px-4 py-3 text-neutral-900 text-sm dark:bg-[#181818] dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full leading-relaxed">{props.children}</div>
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
      children,
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
  YouTube: _YTC,
  code: Code,
  Table,
  del: Strikethrough,
  Callout,
};

export function CustomMDX(
  props: React.JSX.IntrinsicAttributes & MDXRemoteProps,
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
