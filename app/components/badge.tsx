import type { PropsWithChildren } from "react";

export const Badge = ({
  children,
  ...props
}: PropsWithChildren<{ label: string }>) => (
  <span
    className="me-2 rounded-sm bg-green-100 px-2.5 py-0.5 font-medium text-green-800 text-xs dark:bg-green-900 dark:text-green-300"
    {...props}
  >
    {props.label}
  </span>
);
