import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${
        process.env.DEPLOYMENT_URL || "http://localhost:3000"
      }/api/graphql`,
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
