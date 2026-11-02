import { db } from "app/lib/drizzle";
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
import { GraphQLError } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";
import { type Token, verify } from "@/app/lib/jwt";
import { createLogRepository } from "@/app/lib/repository/log-repository";

interface NextContext {
  params: Promise<Record<string, string>>;
}

// ─── Repository (deep module) — single source for all log queries ─────────────

const logRepo = createLogRepository(db);

const { handleRequest } = createYoga<NextContext & { currentUser?: Token }>({
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
        path: String
        referrer: String
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
        logByClientId: async (_parent, args, ctx) => {
          const { skip = 0, take = 10 } = args;
          if (!ctx.currentUser)
            throw new GraphQLError("Not authorized", {
              extensions: { code: "FORBIDDEN" },
            });

          const result = logRepo.findLogs({ take, skip, aggregate: true });
          if (!result.ok) {
            console.error("logByClientId error", result.error);
            throw new GraphQLError("Database error", {
              extensions: { code: "INTERNAL_SERVER_ERROR" },
            });
          }
          return result.value;
        },
        log: async (_parent, args, ctx) => {
          const { skip = 0, take = 10, clientId = null } = args;

          if (!ctx.currentUser)
            throw new GraphQLError("Not authorized", {
              extensions: { code: "FORBIDDEN" },
            });

          const result = logRepo.findLogs({ take, skip, clientId });
          if (!result.ok) {
            console.error("log query error", result.error);
            throw new GraphQLError("Database error", {
              extensions: { code: "INTERNAL_SERVER_ERROR" },
            });
          }
          return result.value;
        },
      },
    },
  }),
  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  context: async (initialContext) => {
    try {
      const accessToken =
        initialContext.request.headers.get(ACCESS_TOKEN_COOKIE_NAME) ||
        (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value ||
        "";
      const currentUser = verify(accessToken);
      return { ...initialContext, currentUser };
    } catch (e) {
      console.warn("Failed to get context", e);
      return initialContext;
    }
  },
  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
