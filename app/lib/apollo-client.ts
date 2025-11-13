import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `https://${
        process.env.VERCEL_URL || "http://localhost:3000"
      }/api/graphql`,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
