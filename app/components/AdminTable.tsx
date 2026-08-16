"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  columnVisibilityFeature,
  coreRowModelsFeature,
  flexRender,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type { Route } from "next";
import Link from "next/link";
import { useMemo } from "react";
import TimeCell from "./time-cell";

type LogEntry = {
  count: number;
  time: string;
  ua: string;
  geo: { country?: string; city?: string };
  clientId: string;
  referrals?: string[];
};

type ProcessedLogEntry = LogEntry & { bgClass: string };

interface AdminTableProps {
  data: LogEntry[];
}

// Create features once, statically (recommended by TanStack Table v9)
const features = tableFeatures({
  coreRowModelsFeature,
  columnVisibilityFeature,
});

function AdminTable({ data }: AdminTableProps) {
  const toFlagEmoji = (countryCode?: string) => {
    if (!countryCode) return "";
    const code = countryCode.trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(code)) return "";
    const base = 127397; // 0x1F1E6 - 'A' (65)
    return String.fromCodePoint(
      code.charCodeAt(0) + base,
      code.charCodeAt(1) + base,
    );
  };

  const truncate = (text: string, max = 50): string => {
    if (text.length <= max) return text;
    return `${text.slice(0, max - 1)}…`;
  };

  const summarizeUA = (uaRaw: string): string => {
    const ua = uaRaw || "";
    const browser = (() => {
      const edge = ua.match(/Edg\/?([\d.]+)/);
      if (edge) return `Edge ${edge[1] ?? ""}`.trim();
      const chrome = ua.match(/Chrome\/?([\d.]+)/);
      // Exclude Edge which also contains Chrome
      if (chrome && !edge) return `Chrome ${chrome[1] ?? ""}`.trim();
      const firefox = ua.match(/Firefox\/?([\d.]+)/);
      if (firefox) return `Firefox ${firefox[1] ?? ""}`.trim();
      const versionSafari = ua.match(/Version\/?([\d.]+).*Safari/);
      const safari =
        ua.includes("Safari") && !ua.includes("Chrome")
          ? `Safari ${versionSafari?.[1] ?? ""}`.trim()
          : "";
      if (safari) return safari;
      return "";
    })();

    const os = (() => {
      if (/Windows NT 10\.0/.test(ua)) return "Windows 10";
      if (/Windows NT 11\.0/.test(ua)) return "Windows 11";
      if (/Windows NT/.test(ua)) return "Windows";
      const mac = ua.match(/Mac OS X ([\d_]+)/);
      if (mac) return `macOS ${(mac?.[1] ?? "").replace(/_/g, ".")}`;
      if (/iPhone|iPad|iPod/.test(ua)) {
        const ios = ua.match(/OS ([\d_]+) like Mac OS X/);
        return `iOS${
          ios ? ` ${(ios?.[1] ?? "").replace(/_/g, ".")}` : ""
        }`.trim();
      }
      const android = ua.match(/Android ([\d.]+)/);
      if (android) return `Android ${android[1]}`;
      if (/Linux/.test(ua)) return "Linux";
      return "";
    })();

    const parts = [browser, os].filter(Boolean).join(" on ");
    return parts || ua;
  };

  const columns: ColumnDef<typeof features, ProcessedLogEntry, any>[] = [
    {
      accessorKey: "time",
      header: "time",
      cell: ({ cell }) => <TimeCell iso={cell.getValue() as string} />,
    },
    {
      accessorKey: "count",
      header: "count",
    },
    {
      accessorKey: "geo",
      header: "geo",
      cell: ({ cell }) => {
        const geo = cell.getValue() as LogEntry["geo"];
        const countryCode = geo.country;
        const city = geo.city || "";
        const flag = toFlagEmoji(countryCode);
        let display = flag && city ? `${flag} ${city}` : flag || city || "";
        if (!display) display = JSON.stringify(geo);
        return <span>{display}</span>;
      },
    },
    {
      accessorKey: "ua",
      header: "ua",
      cell: ({ cell }) => {
        const ua = cell.getValue() as string;
        return <span title={ua}>{truncate(summarizeUA(ua))}</span>;
      },
    },
    {
      accessorKey: "referrals",
      header: "referrals",
      cell: ({ cell }) => {
        const refs = cell.getValue() as string[] | undefined;
        const display = refs ? refs.join(", ") : "";
        return <span title={display}>{truncate(display)}</span>;
      },
    },
    {
      accessorKey: "clientId",
      header: "clientId",
      cell: ({ cell }) => {
        const clientId = cell.getValue() as string;
        return (
          <Link href={`/admin/${clientId}` as Route}>
            <span title={clientId}>{truncate(clientId)}</span>
          </Link>
        );
      },
    },
  ];

  // Compute bgClass
  const processedData = useMemo(
    () =>
      data.map((row) => ({
        ...row,
        bgClass:
          row.count === 1
            ? "bg-slate-200 text-gray-500"
            : "text-gray-900 bg-slate-50 ",
      })),
    [data],
  );

  const table = useTable({
    features,
    data: processedData,
    columns,
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b text-left">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2 pr-4 font-medium">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`border-b/50 ${row.original.bgClass}`}>
              {row.getVisibleCells().map((cell: any) => (
                <td
                  key={cell.id}
                  className={
                    cell.column.id === "geo"
                      ? "py-2 pr-4 align-middle"
                      : "py-2 pr-4 align-top"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
