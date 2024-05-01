/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/server/trpc/router/weatherRouter.ts
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { fetchWeather } from '~/app/_components/apiClient';
import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();
// Initialize the router using createTRPCRouter if it's set up to do so without any arguments.
export const weatherRouter = createTRPCRouter({

  fetchWeather:publicProcedure
  .query(async () => {
     // Directly call fetchWeather without passing any input.
     
     const weatherData = await fetchWeather()
     return weatherData;
   }),
 /*  addSensorData: publicProcedure
    .input()
    .mutation(async ({ input }) => {
      console.log("Received input:", input);  // Log to see what is received
      // Here, the data is inserted into the database using Prisma
      const newSensorData = await prisma.weather.create({
        data: input
      });
      return newSensorData; // Return the newly created sensor data entry
    }),*/
 });
export default weatherRouter;
