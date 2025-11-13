import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/graphql`,
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
