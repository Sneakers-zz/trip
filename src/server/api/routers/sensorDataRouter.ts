// src/server/api/routers/sensorDataRouter.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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
      const { error } = await supabase.from("SensorData").insert([
        {
          chip_id: input.chipId,
          water_1: input.water1,
          water_2: input.water2,
          water_3: input.water3,
          water_4: input.water4,
          temp_c: input.tempC,
          temp_f: input.tempF,
          uv_light: input.uvLight,
        },
      ]);

      if (error) {
        console.error("Error inserting sensor data:", error);
        throw new Error("Failed to insert sensor data");
      }

      return { success: true };
    }),
});

export default sensorDataRouter;
