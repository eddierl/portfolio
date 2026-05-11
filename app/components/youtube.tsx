"use client";

import ReactPlayer from "react-player";

export interface YouTubeProps {
  videoId: string;
  start?: string;
}

export function YouTubeComponent({ videoId, start }: YouTubeProps) {
  const url = new URL("https://www.youtube.com/watch");
  url.searchParams.set("v", videoId);

  if (start) {
    url.searchParams.set("t", start);
  }

  return (
    <div className="relative h-0 w-full overflow-hidden rounded-lg pb-[56.25%]">
      <ReactPlayer
        src={url.toString()}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        controls
      />
    </div>
  );
}
