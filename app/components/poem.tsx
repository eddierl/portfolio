"use client";

import { useEffect, useState } from "react";

type PoemProps = {
  initialContent?: string;
  className?: string;
};

export function Poem({ initialContent, className }: PoemProps) {
  const [poem, setPoem] = useState<string | null>(initialContent ?? null);
  const [loading, setLoading] = useState(initialContent === undefined);

  useEffect(() => {
    if (initialContent !== undefined) return;

    let cancelled = false;

    fetch("/api/poems/today")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch poem");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setPoem(data.content);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Poem fetch error:", error);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [initialContent]);

  const stanzas = poem?.split("\n\n") ?? [];

  return (
    <div className={["space-y-3 text-[var(--color-dim)] italic", className].join(" ")}>
      {loading ? (
        <p className="animate-pulse text-center">Loading poem...</p>
      ) : stanzas.length > 0 ? (
        stanzas.map((stanza, i) => (
          <div key={i}>
            {stanza.split("\n").map((line, j) => (
              <p key={j} className="leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center">No poem available yet.</p>
      )}
    </div>
  );
}
