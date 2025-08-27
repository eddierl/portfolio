import React, { type FunctionComponent, type PropsWithChildren } from "react";
import Link from "next/link";
import { type ImageProps } from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { TweetComponent } from "./tweet";
import { CaptionComponent } from "./caption";
import { YouTubeComponent } from "./youtube";
import { ImageGrid } from "./image-grid";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import Image from "next/image";
import { blur } from "app/lib/image/blur";

function CustomLink(props: PropsWithChildren<{ href: string }>) {
  let href = props.href;
  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
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

function Code({ children, ...props }: PropsWithChildren<{}>) {
  //@ts-expect-error
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

//@ts-expect-error
function Table({ data }) {
  //@ts-expect-error
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  //@ts-expect-error
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {/*@ts-expect-error*/}
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
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

//@ts-expect-error
function Callout(props) {
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
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading = ({ children }: PropsWithChildren<{}>) => {
    //@ts-expect-error
    let slug = slugify(children);
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

let components = {
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
