"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const UpdateLastSeen = () => {
  const [_value, setValue] = useLocalStorage("last-seen", new Date());

  useEffect(() => setValue(new Date()));

  return null;
};
