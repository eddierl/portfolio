"use client";
import YT from "react-youtube";

export function YouTubeComponent({
  start,
  ...props
}: React.ComponentProps<typeof YT>) {
  return (
    <div className="relative my-6 h-0 w-full pb-[56.25%]">
      <YT
        opts={{
          height: "100%",
          width: "100%",
          playerVars: {
            ...(start ? { start } : {}),
          },
        }}
        {...props}
        className="absolute top-0 left-0 h-full w-full overflow-auto rounded-lg"
      />
    </div>
  );
}
