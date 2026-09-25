import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";

const createApolloClient = async () => {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  return new ApolloClient({
    link: new HttpLink({
      uri: `${
        process.env.DEPLOYMENT_URL
          ? `https://${process.env.DEPLOYMENT_URL}`
          : "http://localhost:3000"
      }/api/graphql`,
      credentials: "same-origin",
      ...(token ? { headers: { [ACCESS_TOKEN_COOKIE_NAME]: token } } : {}),
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
