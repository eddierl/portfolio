"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "bg-[var(--normal-bg)] text-[var(--normal-text)] border border-[var(--normal-border)] shadow-sm",
          actionButton:
            "bg-[var(--normal-text)] text-[var(--normal-bg)] hover:opacity-90",
        },
      }}
      {...props}
    />
  );
};
export { Toaster };
