import Link from "next/link";
import type { FormHTMLAttributes } from "react";

export const Login = ({
  error,
  login,
}: {
  error: string;
  login: FormHTMLAttributes<HTMLFormElement>["action"];
}) => {
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 font-semibold text-2xl">Admin Login</h1>
      {error ? <p className="mb-3 text-red-600">{error}</p> : null}
      <form action={login} className="space-y-3">
        <input
          type="text"
          name="username"
          defaultValue="admin"
          className="w-full rounded border bg-transparent px-3 py-2"
          autoComplete="username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter admin password"
          className="w-full rounded border bg-transparent px-3 py-2"
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded border px-4 py-2"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-muted-foreground text-sm">
        <Link href="/">Back to site</Link>
      </p>
    </div>
  );
};
