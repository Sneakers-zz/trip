import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { prisma } from "~/app/_components/prisma";

export const databaseRouter = createTRPCRouter({
  getWeatherData: publicProcedure.query(async () => {
    return await prisma.weather.findMany();
  }),
  getCropsData: publicProcedure.query(async () => {
    return await prisma.crop.findMany({
    });
  }),
  getSensorData: publicProcedure.query(async () => {
    return await prisma.sensorData.findMany();
  }),
});
