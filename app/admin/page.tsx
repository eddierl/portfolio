import Link from "next/link";
import TimeCell from "../components/time-cell";
import { supabase } from "../lib/supabase";
import { isAuthenticated, login, logout } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const authed = await isAuthenticated();

  const params = (await searchParams) ?? {};
  const error = params?.error ? "Invalid password" : "";

  if (!authed) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        {error ? <p className="text-red-600 mb-3">{error}</p> : null}
        <form action={login} className="space-y-3">
          <input
            type="password"
            name="password"
            placeholder="Enter admin password"
            className="w-full border rounded px-3 py-2 bg-transparent"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded px-4 py-2 border"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href="/">Back to site</Link>
        </p>
      </div>
    );
  }

  const table = process.env.ADMIN_ENTRIES_TABLE ?? "logs";

  const { data, error: supabaseError } = await supabase
    .from(table)
    .select("time,ua,geo,client_id")
    .neq("geo->>country", null)
    .neq("geo->>country", "")
    .neq("client_id", "c2b6d823-85c4-4687-a255-a9908861c014")
    .neq("client_id", null)
    .order("time", { ascending: false })
    .limit(100);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <form action={logout}>
          <button type="submit" className="border rounded px-3 py-2">
            Logout
          </button>
        </form>
      </div>
      {supabaseError ? (
        <p className="text-red-600">{supabaseError.message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b">
                {(() => {
                  const columns = [
                    "time",
                    "ua",
                    "device",
                    "geo",
                    "client_id",
                  ] as const;
                  if (data && data.length > 0) {
                    return columns.map((key) => (
                      <th key={key} className="py-2 pr-4 font-medium">
                        {key}
                      </th>
                    ));
                  }
                  return <th className="py-2 pr-4 font-medium">No data</th>;
                })()}
              </tr>
            </thead>
            <tbody>
              {(() => {
                const seen = new Set<string>();
                let currentColorIndex = 0;
                return data?.map((row, idx) => {
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
                      if (chrome && !edge)
                        return `Chrome ${chrome[1] ?? ""}`.trim();
                      const firefox = ua.match(/Firefox\/?([\d.]+)/);
                      if (firefox) return `Firefox ${firefox[1] ?? ""}`.trim();
                      const versionSafari = ua.match(
                        /Version\/?([\d.]+).*Safari/,
                      );
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
                      if (mac)
                        return `macOS ${(mac?.[1] ?? "").replace(/_/g, ".")}`;
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

                  const getDevice = (uaRaw: string): string => {
                    const ua = uaRaw || "";
                    return /Mobile|iPhone|Android|iPad|iPod/.test(ua)
                      ? "Mobile"
                      : "Desktop";
                  };

                  const clientId = row.client_id as string;
                  const isNew = !seen.has(clientId);
                  if (isNew) {
                    seen.add(clientId);
                    currentColorIndex = (currentColorIndex + 1) % 2;
                  }
                  const bgClass =
                    currentColorIndex === 0 ? "" : "text-gray-900 bg-slate-50 ";

                  return (
                    <tr key={idx} className={`border-b/50  ${bgClass}`}>
                      {(
                        ["time", "ua", "device", "geo", "client_id"] as const
                      ).map((key) => {
                        const value = (row as Record<string, unknown>)[
                          key as string
                        ];
                        let display: string;
                        if (key === "device") {
                          const uaValue = (row as Record<string, unknown>).ua as
                            | string
                            | undefined;
                          display = getDevice(String(uaValue ?? ""));
                        } else if (
                          key === "geo" &&
                          value &&
                          typeof value === "object"
                        ) {
                          const geo = value as Record<string, unknown>;
                          const countryCode = (geo.country ||
                            geo.countryCode) as string | undefined;
                          const city = (geo.city as string | undefined) || "";
                          const flag = toFlagEmoji(countryCode);
                          display =
                            flag && city
                              ? `${flag} ${city}`
                              : flag || city || "";
                          if (!display) display = JSON.stringify(value);
                        } else {
                          display =
                            typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value ?? "");
                        }
                        const cellClass =
                          key === "geo"
                            ? "py-2 pr-4 align-middle"
                            : "py-2 pr-4 align-top";
                        return (
                          <td key={key} className={cellClass}>
                            {key === "time" ? (
                              <TimeCell iso={String(value ?? "")} />
                            ) : key === "ua" ? (
                              <span title={String(value ?? "")}>
                                {truncate(summarizeUA(String(value ?? "")))}
                              </span>
                            ) : (
                              <span title={display}>{truncate(display)}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
