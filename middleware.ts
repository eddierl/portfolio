import { NextResponse, NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;

  const url = new URL(request.url);
  const isPdf = url.pathname.endsWith(".pdf");
  if (isPdf) {
    const geo = geolocation(request);
    const log = {
      path: request.nextUrl.pathname,
      time: new Date().toISOString(),
      ua: request.headers.get("user-agent"),
      geo,
    };

    // Send asynchronously (don’t block request)
    fetch(`${baseUrl}/api/log`, {
      method: "POST",
      body: JSON.stringify(log),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch((e) => console.error(e));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
