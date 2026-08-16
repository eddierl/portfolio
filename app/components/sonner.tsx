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
            "bg-(--normal-bg) text-(--normal-text) border border-(--normal-border) shadow-sm",
          actionButton:
            "bg-(--normal-text) text-(--normal-bg) hover:opacity-90",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
