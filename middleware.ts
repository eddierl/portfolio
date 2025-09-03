import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const isPdf = url.pathname.endsWith(".pdf");
  if (isPdf) {
    console.info(request.url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
