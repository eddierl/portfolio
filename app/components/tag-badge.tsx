import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  href?: string;
  size?: "sm" | "md";
}

export function TagBadge({ tag, href, size = "sm" }: TagBadgeProps) {
  const classes = [
    "inline-flex items-center rounded-full font-medium",
    size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-0.5 text-sm",
    "bg-primary/10 text-primary hover:bg-primary/20",
  ].join(" ");

  if (href) {
    return (
      // @ts-expect-error - Next.js Link typing is overly strict for string hrefs
      <Link href={href} className={classes}>
        {tag}
      </Link>
    );
  }

  return <span className={classes}>{tag}</span>;
}
