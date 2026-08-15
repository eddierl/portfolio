type PoemProps = {
  content: string;
  className?: string;
};

export function Poem({ content, className }: PoemProps) {
  const stanzas = content.split("\n\n");

  return (
    <div className={["space-y-3 text-[var(--dim)] italic", className].join(" ")}>
      {stanzas.map((stanza, i) => (
        <div key={i}>
          {stanza.split("\n").map((line, j) => (
            <p key={j} className="leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
