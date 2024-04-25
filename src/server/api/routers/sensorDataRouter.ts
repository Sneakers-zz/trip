// src/server/trpc/router/sensorDataRouter.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
// Initialize the router using createTRPCRouter if it's set up to do so without any arguments.
const sensorInput = z.object({
    chipId: z.number(),
    water1: z.number(),
    water2: z.number(),
    water3: z.number(),
    water4: z.number(),
    tempC: z.number(),
    tempF: z.number(),
    uvLight: z.number(),
});

export const sensorDataRouter = createTRPCRouter({
addSensorData: publicProcedure
.input(sensorInput)
.mutation(async ({ input }) => {
  // simulate a slow db call
    return prisma.sensorData.create({
         data: input
      })    
  })
});

export default sensorDataRouter;