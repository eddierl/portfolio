import Image from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl: string;
  imageUrl?: string;
};

export function ProjectCard({
  title,
  description,
  tags,
  liveUrl,
  codeUrl,
  imageUrl,
}: ProjectCardProps) {
  return (
    <div className="card overflow-hidden">
      {imageUrl && (
        <div className="relative flex h-48 w-full items-center justify-center bg-panel">
          <Image
            src={imageUrl}
            alt={`${title} screenshot`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-medium">{title}</h3>
        <p className="mb-3 text-sm text-dim">{description}</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-accent/10 px-2 py-0.5 text-xs text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              className="text-sm text-accent underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          )}
          <a
            href={codeUrl}
            className="text-sm text-accent underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
}
