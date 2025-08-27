import type { PropsWithChildren } from "react";

export const Badge = ({
  children,
  ...props
}: PropsWithChildren<{ label: string }>) => (
  <span
    className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300"
    {...props}
  >
    {props.label}
  </span>
);
