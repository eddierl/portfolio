"use client";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import * as React from "react";
import { useId } from "react";

const FaCircleHalfStroke = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  const uniqueId = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 32 32"
      {...props}
    >
      <clipPath id={`theme-toggle__simple__cutout-${uniqueId}`}>
        <path
          className={"dark:-translate-x-1/2 dark:translate-y-1 transition-all"}
          d="M0-5h55v37h-55zm32 12a1 1 0 0025 0 1 1 0 00-25 0"
        />
      </clipPath>
      <g clipPath={`url(#theme-toggle__simple__cutout-${uniqueId})`}>
        <circle cx="16" cy="16" r="15" />
      </g>
    </svg>
  );
};

const storageKey = "theme-preference";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export const ThemeSwitch: React.FC = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">(
    "light",
  );

  const getColorPreference = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      const storedPreference = localStorage.getItem(storageKey);
      if (storedPreference) {
        return storedPreference as "light" | "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const reflectPreference = (theme: "light" | "dark") => {
    document.documentElement.classList.remove("bg-light", "bg-dark");
    document.documentElement.classList.add(`bg-${theme}`);
    setCurrentTheme(theme);
    setTheme(theme);
  };

  React.useEffect(() => {
    setMounted(true);
    const initTheme = getColorPreference();
    reflectPreference(initTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? "dark" : "light";
      localStorage.setItem(storageKey, newTheme);
      reflectPreference(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [getColorPreference, reflectPreference]);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem(storageKey, newTheme);
    reflectPreference(newTheme);
  };

  if (!mounted) {
    return <FaCircleHalfStroke className="size-3.5" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={currentTheme === "dark"}
      onClick={toggleTheme}
      className="flex items-center justify-center transition-opacity duration-300 hover:opacity-80 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current rounded"
    >
      <FaCircleHalfStroke
        className={"size-3.5 dark:text-[#D4D4D4] text-[#1c1c1c]"}
      />
    </button>
  );
};
