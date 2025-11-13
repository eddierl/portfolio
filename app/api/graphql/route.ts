import { sql } from "app/lib/neon";
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
        logByClientId(take: Int, skip: Int): [LogWithCount]
      }

      type Log {
        id: ID
        time: String
        ua: String
        geo: Geo
        client_id: String
      }

      type LogWithCount {
        count: Int
        time: String
        ua: String
        client_id: String
        geo: Geo
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
        logByClientId: async (_parent, args, _ctx) => {
          const { skip = 0, take = 10 } = args;

          const data = await sql.query(`
            select count(1),max(time) as time,ua,client_id,geo from public.logs
            where client_id != 'c2b6d823-85c4-4687-a255-a9908861c014'
            
            group by client_id,geo,ua
            order by time DESC
            limit ${take}
            offset ${skip}
            `);

          return data;
        },
        log: async (_parent, args, _ctx) => {
          const { skip = 0, take = 10 } = args;

          const data = await sql.query(`
            select  time, ua, geo, client_id from public.logs
            where client_id != 'c2b6d823-85c4-4687-a255-a9908861c014'
            order by time DESC
            limit ${take}
            offset ${skip}
            `);

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
