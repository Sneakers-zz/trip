
// src/server/trpc/router/root.ts
import { postRouter } from "~/server/api/routers/post";
import { cropsRouter } from "~/server/api/routers/cropRouter"; // Ensure the import path is correct
import  {weatherRouter } from "~/server/api/routers/weatherRouter";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import {sensorDataRouter} from "./routers/sensorDataRouter";
import { databaseRouter } from "./routers/databaseRouter";

/**
 * This is the primary router for your server.
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    post:postRouter,
    crop:cropsRouter,
    weather:weatherRouter,
    sensordata:sensorDataRouter,
    dbdumpdata:databaseRouter,
}); // Ensure consistent formatting in namespaces


// Export type definition of API
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);




