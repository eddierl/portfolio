"use client";

import { refreshSession } from "app/lib/admin-auth";
import { useEffect, useTransition } from "react";

export default function RefreshCookie() {
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      await refreshSession();
    });
  }, []);

  return null;
}
