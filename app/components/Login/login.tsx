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
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      {error ? <p className="text-red-600 mb-3">{error}</p> : null}
      <form action={login} className="space-y-3">
        <input
          type="text"
          name="username"
          defaultValue="admin"
          className="w-full border rounded px-3 py-2 bg-transparent"
          autoComplete="username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter admin password"
          className="w-full border rounded px-3 py-2 bg-transparent"
          autoComplete="current-password"
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
};
