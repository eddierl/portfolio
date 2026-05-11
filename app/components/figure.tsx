import type React from "react";

interface FigureProps {
  children: React.ReactNode;
  alt?: string;
}

export function Figure({ children, alt }: FigureProps) {
  return (
    <figure className="my-4 flex flex-col">
      {children}
      {alt && (
        <figcaption className="mt-2 text-gray-500 text-sm italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
