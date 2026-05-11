"use client";
import YT from "react-youtube";

export interface YouTubeProps extends React.ComponentProps<typeof YT> {
  start?: string | number;
}

export function YouTubeComponent({ start, ...props }: YouTubeProps) {
  const startSeconds =
    typeof start === "string" ? Number.parseInt(start, 10) : start;

  return (
    <div className="relative h-0 w-full overflow-hidden rounded-lg pb-[56.25%]">
      <YT
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            ...(startSeconds ? { start: startSeconds } : {}),
          },
        }}
        {...props}
        className="absolute top-0 left-0 h-full w-full"
      />
    </div>
  );
}
