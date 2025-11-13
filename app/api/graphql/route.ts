// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { supabase } from "app/lib/supabase";
import { createSchema, createYoga } from "graphql-yoga";

interface NextContext {
  params: Promise<Record<string, string>>;
}

const { handleRequest } = createYoga<NextContext>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
        viewer(user: String): Int
        log(take: Int, skip: Int): [Log]
      }

      type Log {
        id: ID
        time: String
        ua: String
        geo: Geo
        client_id: String
      }

      type Geo {
        city: String
        country: String
        flag: String
        countryRegion: String
        region: String
        latitude: String
        longitude: String
        postalCode: String
      }
    `,
    resolvers: {
      Query: {
        greetings: () =>
          "This is the `greetings` field of the root `Query` type",
        viewer: (parent, args, ctx) => {
          console.log({ parent, args, ctx });
          return null;
        },
        log: async (parent, args, ctx) => {
          const { skip = 0, take = 10 } = args;
          const { data, error: supabaseError } = await supabase
            .from("logs")
            .select("id,time,ua,geo,client_id")
            .neq("geo->>country", null)
            .neq("geo->>country", "")
            .neq("client_id", "c2b6d823-85c4-4687-a255-a9908861c014")
            .neq("client_id", null)
            .order("time", { ascending: false })
            .range(skip, skip + take);
          return data;
        },
      },
    },
  }),
  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
