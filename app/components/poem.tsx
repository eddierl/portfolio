"use client";

import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

type PoemProps = {
  className?: string;
  fallback?: ReactNode;
};

export function Poem({ className, fallback }: PoemProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["poem"],
    queryFn: async () => {
      const res = await fetch("/api/poems/today");
      if (!res.ok) throw new Error("Failed to fetch poem");
      return res.json() as Promise<{ content: string }>;
    },
    retry: false,
  });

  const stanzas = data?.content?.split("\n\n") ?? [];

  return (
    <div className={["space-y-3 text-[var(--color-dim)] italic", className].join(" ")}>
      {isLoading ? (
        <p className="animate-pulse text-center">Loading poem...</p>
      ) : data ? (
        stanzas.map((stanza, i) => (
          <div key={i}>
            {stanza.split("\n").map((line, j) => (
              <p key={j} className="leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        ))
      ) : fallback ? (
        fallback
      ) : (
        <p className="text-center">No poem available yet.</p>
      )}
    </div>
  );
}
