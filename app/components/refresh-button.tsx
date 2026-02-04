"use client";

import type { ButtonHTMLAttributes, ClassAttributes } from "react";
import type { JSX } from "react/jsx-runtime";

export default (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <button onClick={reload} type="button" {...props}>
      Refresh Now
    </button>
  );
};
