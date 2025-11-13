"use client";

import { useMemo } from "react";

type TimeCellProps = {
  iso: string;
};

function formatRelative(from: Date, to: Date): string {
  const diffMs = from.getTime() - to.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const absSec = Math.abs(diffSec);

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  if (absSec < 60)
    return rtf.format(Math.sign(diffSec) * Math.ceil(absSec), "second");
  const diffMin = Math.round(diffSec / 60);
  const absMin = Math.abs(diffMin);
  if (absMin < 60) return rtf.format(diffMin, "minute");
  const diffHour = Math.round(diffMin / 60);
  const absHour = Math.abs(diffHour);
  if (absHour < 24) return rtf.format(diffHour, "hour");
  const diffDay = Math.round(diffHour / 24);
  const absDay = Math.abs(diffDay);
  if (absDay < 7) return rtf.format(diffDay, "day");
  const diffWeek = Math.round(absDay / 7) * Math.sign(diffDay);
  if (Math.abs(diffWeek) < 5) return rtf.format(diffWeek, "week");
  const diffMonth = Math.round(absDay / 30) * Math.sign(diffDay);
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, "month");
  const diffYear = Math.round(absDay / 365) * Math.sign(diffDay);
  return rtf.format(diffYear, "year");
}

export default function TimeCell({ iso }: TimeCellProps) {
  const date = useMemo(
    () => new Date(typeof iso === "string" ? parseInt(iso, 10) : iso),
    [iso]
  );

  const localFormatted = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch {
      return date.toLocaleString();
    }
  }, [date]);

  const relative = useMemo(() => formatRelative(date, new Date()), [date]);

  return (
    <time dateTime={iso} title={localFormatted}>
      {relative}
    </time>
  );
}
