import { db } from "app/lib/drizzle";
import { logsTable } from "app/lib/drizzle/schema";
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  max,
  ne,
  sql,
} from "drizzle-orm";
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
        log(take: Int, skip: Int, clientId: String): [Log]
        logByClientId(take: Int, skip: Int): [LogWithCount]
      }

      type Log {
        id: ID
        time: String
        ua: String
        device: String
        geo: Geo
        clientId: String
      }

      type LogWithCount {
        count: Int
        time: String
        ua: String
        device: String
        clientId: String
        geo: Geo
        referrals: [String]
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

          try {
            const columns = getTableColumns(logsTable);
            const logs = await db
              ?.select({
                clientId: columns.clientId,
                geo: columns.geo,
                ua: columns.ua,
                count: count(logsTable.id),
                time: max(logsTable.time),
                referrals: sql`array_agg(${logsTable.referrer})`,
              })
              .from(logsTable)
              .where(
                and(
                  ne(
                    logsTable.clientId,
                    "c2b6d823-85c4-4687-a255-a9908861c014",
                  ),
                  sql`${logsTable.geo}->>'country' is not null`,
                ),
              )
              .groupBy(logsTable.clientId, logsTable.geo, logsTable.ua)
              .limit(take)
              .offset(skip)
              .orderBy(desc(max(logsTable.time)));

            return logs;
          } catch (error) {
            console.error("error", error);
            throw new Error("failed");
          }
        },
        log: async (_parent, args, _ctx) => {
          const { skip = 0, take = 10, clientId = null } = args;

          const columns = getTableColumns(logsTable);
          const logs = await db
            ?.select(columns)
            .from(logsTable)
            .where(
              and(
                ne(logsTable.clientId, "c2b6d823-85c4-4687-a255-a9908861c014"),
                sql`${logsTable.geo}->>'country' is not null`,
                ...(clientId ? [eq(logsTable.clientId, clientId)] : []),
              ),
            )
            .limit(take)
            .offset(skip)
            .orderBy(desc(logsTable.time));

          return logs;
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
