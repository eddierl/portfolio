"use client";

import NextError from "next/error";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en">
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` but the App Router does not expose
        status codes for errors, so we pass 0 to render a generic error. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
