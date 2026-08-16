import type { ReactNode } from "react";
import { getLatestPoem } from "@/app/lib/poem";

type PoemProps = {
  className?: string;
  fallback?: ReactNode;
};

export async function Poem({ className, fallback }: PoemProps) {
  const data = await getLatestPoem();
  const stanzas = data?.content?.split("\n\n") ?? [];

  return (
    <div
      className={["space-y-3 text-dim italic", className].join(
        " ",
      )}
    >
      {data ? (
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
