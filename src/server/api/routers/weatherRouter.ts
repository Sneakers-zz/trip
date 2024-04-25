/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/server/trpc/router/weatherRouter.ts
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { fetchWeather } from '~/app/_components/apiClient';

// Initialize the router using createTRPCRouter if it's set up to do so without any arguments.
export const weatherRouter = createTRPCRouter({

  fetchWeather:publicProcedure
  .query(async () => {
     // Directly call fetchWeather without passing any input.
     
     const weatherData = await fetchWeather()
     return weatherData;
   }),
 });
export default weatherRouter;
