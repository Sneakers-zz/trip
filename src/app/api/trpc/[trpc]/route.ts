/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/app/api/trpc/[trpc]/route.ts

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};
const handler = async (req: NextRequest) => {
  if (env.NODE_ENV === "development") {
    // Attempt to clone the request for logging purposes
   // const clonedRequest = req.clone();
    try {
    //  const body = await clonedRequest.json();
   //   console.log(`Incoming request body: ${JSON.stringify(body)}`);
    } catch (err) {
      console.error("Failed to parse request body:", err);
    }
  }

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };
