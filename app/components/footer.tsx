import { metaData, socialLinks } from "app/lib/config";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: TbMailFilled,
} satisfies Record<keyof typeof socialLinks, IconType>;

const YEAR = new Date().getFullYear();

function SocialLink({
  href,
  icon: Icon,
  ...props
}: {
  href: string;
  icon: IconType;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="float-right flex gap-3.5 text-lg transition-opacity duration-300 *:hover:opacity-80">
      {(
        Object.entries(socialLinks) as Array<[keyof typeof socialLinks, string]>
      ).map(([type, link]) => (
        <SocialLink
          key={type}
          href={link}
          icon={icons[type]}
          aria-label={type}
        />
      ))}
      {/* <SocialLink href={socialLinks.twitter} icon={FaXTwitter} /> */}
      {/* <SocialLink
        href={socialLinks.github}
        aria-label="github"
        icon={FaGithub}
      /> */}
      {/* <SocialLink href={socialLinks.instagram} icon={FaInstagram} /> */}
      {/* <SocialLink
        href={socialLinks.linkedin}
        aria-label="linkedin"
        icon={FaLinkedinIn}
      />
      <SocialLink
        href={socialLinks.email}
        aria-label="email"
        icon={TbMailFilled}
      /> */}
      {/* <a href="/rss.xml" target="_self">
        <FaRss />
      </a> */}
    </div>
  );
}

export default function Footer() {
  return (
    <small className="mt-16 block text-[#1C1C1C] lg:mt-24 dark:text-[#D4D4D4]">
      <time>© {YEAR}</time>{" "}
      <a
        className="no-underline"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {metaData.title}
      </a>
      <SocialLinks />
    </small>
  );
}
