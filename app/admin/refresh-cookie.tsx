"use client";

import { useEffect, useTransition } from "react";
import { refreshSession } from "app/lib/admin-auth";

export default function RefreshCookie() {
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await refreshSession();
    });
  }, []);

  return null;
}
