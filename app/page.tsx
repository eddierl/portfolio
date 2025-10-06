import Image from "next/image";
import { socialLinks } from "./lib/config";
import Link from "next/link";
import SkillGroups from "./components/skill-groups";

export default function Page() {
  return (
    <section>
      {/* <a href={socialLinks.twitter} target="_blank">
        <Image
          src="/profile.png"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a> */}
      <h1 className="mb-8 text-2xl font-medium"> Hi, I'm Eddie! 👋</h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm a frontend-focused software engineer with over 9 years of
          experience building scalable web and mobile applications. I specialize
          in clean, maintainable code, functional programming principles, and
          creating seamless user experiences. I enjoy turning complex problems
          into elegant solutions using modern technologies like React,
          TypeScript, and Node.js.
        </p>
        <p>
          {/* Nextfolio has everything you need for a portfolio: MDX blog, SEO, RSS,
          Atom & JSON feeds, analytics, Tweet & YouTube embeds, KaTeX and {""} */}
          {/* <a
            target="_blank"
            href="https://github.com/1msirius/Nextfolio?tab=readme-ov-file#features"
          >
            more
          </a> */}
        </p>
        <p>Let’s build something great together.</p>
        {/* <p>
          Nextfolio is{" "}
          <a href={socialLinks.github} target="_blank">
            open-source
          </a>{" "}
          and fully customizable, making it easy to add more features.
        </p>
        <p>
          <a
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F1msirius%2FNextfolio"
            target="_blank"
          >
            Deploy
          </a>{" "}
          your Nextfolio site with Vercel in minutes and follow the set up
          instructions in the{" "}
          <a href="/blog/getting-started">Getting Started</a> post.
        </p>
        <p>
          Built and maintained by{" "}
          <a href="https://imsirius.xyz/" target="_blank">
            Sirius
          </a>
          .
        </p> */}
      </div>

      <SkillGroups />
    </section>
  );
}
