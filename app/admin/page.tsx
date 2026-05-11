import { gql } from "@apollo/client";
import { Login } from "app/components/Login/login";
import createApolloClient from "app/lib/apollo-client";
import Link from "next/link";
import AdminTable from "../components/AdminTable";
import { isAuthenticated, login, logout } from "./actions";
import RefreshCookie from "./refresh-cookie";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const authed = await isAuthenticated();

  const params = (await searchParams) ?? {};
  const error = params?.error ? "Invalid password" : "";

  if (!authed) return <Login error={error} login={login} />;

  const { data, error: apolloError } = await createApolloClient().query<{
    logByClientId: {
      count: number;
      time: string;
      ua: string;
      geo: { country?: string; city?: string };
      clientId: string;
      referral?: string[];
    }[];
  }>({
    query: gql`
      query {
        logByClientId(take: 20) {
          count
          time
          ua
          geo {
            country
            city
          }
          clientId
          referrals
        }
      }
    `,
  });

  return (
    <div className="mx-auto max-w-3xl p-6">
      <RefreshCookie />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-semibold text-2xl">Admin</h1>
        <form action={logout}>
          <button type="submit" className="rounded border px-3 py-2">
            Logout
          </button>
        </form>
      </div>
      <Link
        href="/admin/pdf"
        className="font-semibold text-neutral-900 text-sm transition-colors hover:text-blue-500 dark:text-neutral-100 dark:hover:text-blue-400"
      >
        PDF Preview
      </Link>
      {apolloError ? (
        <p className="text-red-600">{apolloError.message}</p>
      ) : (
        <AdminTable data={data?.logByClientId || []} />
      )}
    </div>
  );
}
