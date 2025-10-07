import { geolocation } from "@vercel/functions";
import { type NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;
  const COOKIE_NAME = "anon_id";

  const url = new URL(request.url);
  const isPdf = url.pathname.endsWith(".pdf");

  // Redirect old resume PDF to new one
  if (url.pathname === "/Eddie_Erlich_Resume.pdf") {
    return NextResponse.redirect(
      new URL("/Edward_Erlich_-_Senior_Software_Engineer_CV.pdf", request.url),
      { status: 308 },
    );
  }

  const response = NextResponse.next();

  // Ensure anonymous cookie exists
  let anonId = request.cookies.get(COOKIE_NAME)?.value;
  if (!anonId) {
    anonId = crypto.randomUUID();
    response.cookies.set(COOKIE_NAME, anonId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  if (isPdf) {
    const geo = geolocation(request);
    const log = {
      path: request.nextUrl.pathname,
      time: new Date().toISOString(),
      ua: request.headers.get("user-agent"),
      geo,
      clientId: anonId,
    };

    // Send asynchronously (don’t block request)
    fetch(`${baseUrl}/api/log`, {
      method: "POST",
      body: JSON.stringify(log),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch((e) => console.error(e));
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
