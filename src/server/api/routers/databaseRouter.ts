import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/app/_components/prisma";
import {
  migrateWeatherToSupabase,
  migrateSensorDataToSupabase,
  migrateCropsToSupabase,
} from "./migrateData";

export const databaseRouter = createTRPCRouter({
  getWeatherData: publicProcedure.query(async () => {
    return await prisma.weather.findMany();
  }),
  getCropsData: publicProcedure.query(async () => {
    return await prisma.crop.findMany({});
  }),
  getSensorData: publicProcedure.query(async () => {
    return await prisma.sensorData.findMany();
  }),

  migrateWeatherToSupabase: publicProcedure.mutation(async () => {
    await migrateWeatherToSupabase();
    return { success: true };
  }),

  migrateSensorDataToSupabase: publicProcedure.mutation(async () => {
    await migrateSensorDataToSupabase();
    return { success: true };
  }),

  migrateCropsToSupabase: publicProcedure.mutation(async () => {
    await migrateCropsToSupabase();
    return { success: true };
  }),
});
