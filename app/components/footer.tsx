import { socialLinks } from "app/lib/config";
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-dim transition-colors hover:text-accent"
      {...props}
    >
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="float-right flex gap-3.5 text-lg *:hover:opacity-80">
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
    </div>
  );
}

export default function Footer() {
  return (
    <small className="mt-16 block text-muted lg:mt-24">
      <span className="text-accent">🥑</span> © {YEAR} <SocialLinks />
    </small>
  );
}
