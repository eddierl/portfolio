import { gql } from "@apollo/client";
import { Login } from "app/components/Login/login";
import createApolloClient from "app/lib/apollo-client";
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
        <AdminTable data={data?.logByClientId || []} />
      )}
    </div>
  );
}
