import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const isPdf = url.pathname.endsWith(".pdf");
  if (isPdf) {
    const log = {
      path: request.nextUrl.pathname,
      time: new Date().toISOString(),
      ua: request.headers.get("user-agent"),
    };

    console.log(log);

    // Send asynchronously (don’t block request)
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/log`, {
      method: "POST",
      body: JSON.stringify(log),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch((e) => console.error(e));
    console.info(request.url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
