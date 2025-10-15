"use client";

import { useEffect, useTransition } from "react";
import { refreshAdminCookie } from "./actions";

export default function RefreshCookie() {
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await refreshAdminCookie();
    });
  }, []);

  return null;
}
