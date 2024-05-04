// src/server/trpc/router/weatherRouter.ts

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { fetchWeather } from '~/app/_components/apiClient';
import { PrismaClient } from '@prisma/client';
import { string, z } from 'zod';

const weatherinput = z.object({
  temp: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  city_id: z.number(),
  city: z.string(),
  country: z.string(),
  lon: z.number(),
  lat: z.number(),
  weather_code: z.number(),
  weather_icon: z.string(),
});

const prisma = new PrismaClient();
export const weatherRouter = createTRPCRouter({
  fetchWeather: publicProcedure.query(() => {
    return fetchWeather()
      .then(weatherData => {
        // Extract and validate the relevant information
        const parsedData = weatherinput.parse({
          temp: weatherData.main.temp,
          temp_min: weatherData.main.temp_min,
          temp_max: weatherData.main.temp_max,
          pressure: weatherData.main.pressure,
          humidity: weatherData.main.humidity,
          wind_speed: weatherData.wind.speed,
          wind_deg: weatherData.wind.deg,
          city_id: weatherData.id,
          city: weatherData.name,
          country: weatherData.sys.country,
          lon: weatherData.coord.lon,
          lat: weatherData.coord.lat,
          weather_code: weatherData.weather[0]?.id,
          weather_icon: weatherData.weather[0]?.icon,
        });

        // Store the validated data
        return prisma.weather.create({
          data: parsedData,
        }).then(() => {
          // Return the original weatherData
          return weatherData;
        });
      });
  }),
});

export default weatherRouter;
