import { gql } from "@apollo/client";
import { isAuthenticated, login, logout } from "app/admin/actions";
import RefreshCookie from "app/admin/refresh-cookie";
import { Login } from "app/components/Login/login";
import TimeCell from "app/components/time-cell";
import createApolloClient from "app/lib/apollo-client";
import type { Route } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<Record<string, string>>;
  params: Promise<Record<string, string>>;
}) {
  const authed = await isAuthenticated();

  const error = (await searchParams)?.error ? "Invalid password" : "";

  if (!authed) return <Login error={error} login={login} />;

  const clientId = (await params).clientId;
  const { data, error: apolloError } = await createApolloClient().query<{
    log: { ua: string; count: number; clientId: string }[];
  }>({
    query: gql`
      query ($clientId: String) {
        log(take: 20, clientId: $clientId) {
          time
          ua
          geo {
            country
            city
          }
          clientId
        }
      }
    `,
    variables: {
      clientId,
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <RefreshCookie />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <form action={logout}>
          <button type="submit" className="border rounded px-3 py-2">
            Logout
          </button>
        </form>
      </div>
      {apolloError ? (
        <p className="text-red-600">{apolloError.message}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b">
                {(() => {
                  const columns = ["time", "geo", "ua", "clientId"] as const;
                  if (data && data.log.length > 0) {
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
                return data?.log.map((row, idx) => {
                  const toFlagEmoji = (countryCode?: string) => {
                    if (!countryCode) return "";
                    const code = countryCode.trim().toUpperCase();
                    if (!/^[A-Z]{2}$/.test(code)) return "";
                    const base = 127397; // 0x1F1E6 - 'A' (65)
                    return String.fromCodePoint(
                      code.charCodeAt(0) + base,
                      code.charCodeAt(1) + base
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
                        /Version\/?([\d.]+).*Safari/
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

                  const clientId = row.clientId as string;
                  const isNew = !seen.has(clientId);
                  if (isNew) {
                    seen.add(clientId);
                    currentColorIndex = (currentColorIndex + 1) % 2;
                  }
                  const bgClass =
                    row.count === 1
                      ? "bg-slate-200 text-gray-500"
                      : "text-gray-900 bg-slate-50 ";

                  return (
                    <tr key={idx} className={`border-b/50  ${bgClass}`}>
                      {(
                        [
                          "time",

                          "geo",
                          "ua",
                          // "device",

                          "clientId",
                        ] as const
                      ).map((key) => {
                        const value = (row as Record<string, unknown>)[
                          key as string
                        ];
                        let display: string;
                        //@ts-expect-error not showing device, need to remove probably
                        if (key === "device") {
                          const uaValue = (row as Record<string, unknown>)
                            .ua as string | undefined;
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
                              <Link href={`/admin/${clientId} ` as Route}>
                                <span title={display}>{truncate(display)}</span>
                              </Link>
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
