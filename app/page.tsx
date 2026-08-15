import path from "node:path";
import { readMDXFile } from "./lib/posts";

const HERO_PATH = path.join(process.cwd(), "content/hero.mdx");

export default function Page() {
  const { content } = readMDXFile(HERO_PATH);
  return (
    <section className="hero">
      {/* <p className="eyebrow">Software Engineer</p> */}
      <h1>
        Hi, I&apos;m Eddie!{" "}
        <span className="inline-block animate-wave">👋</span>
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-sm italic">Here is a poem that I wrote:</p>
        <pre className="mt-2 text-base italic leading-loose">
          {content}
        </pre>
      </div>
    </section>
  );
}


