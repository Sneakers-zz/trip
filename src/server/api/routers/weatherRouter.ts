/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/server/trpc/router/weatherRouter.ts

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { fetchWeather } from '~/app/_components/apiClient';
import { PrismaClient } from '@prisma/client';
import {  z } from 'zod';
import { subHours } from 'date-fns';



const weatherinput = z.object({
  temp: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  wind_speed: z.number().int(),
  wind_deg: z.number().int(),
  city_id: z.number(),
  city: z.string(),
  country: z.string(),
  lon: z.number(),
  lat: z.number(),
  weather_code: z.number(),
  weather_icon: z.string(),
  createdAt: z.date().default(() => new Date()), 
});

const prisma = new PrismaClient();
export const weatherRouter = createTRPCRouter({
  fetchWeather: publicProcedure.query(() => {
    // Get current timestamp minus one hour
    
    const oneHourAgo: Date = subHours(new Date(), 1);

    // Check if the latest weather record is still valid
    return prisma.weather.findFirst({
      where: {
        createdAt: {
          gte: oneHourAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }).then(latestWeather => {
      if (latestWeather) {
        // Return the cached data from the database
        return latestWeather;
      } else {
        // Fetch new weather data from the API
        return fetchWeather().then((weatherData) => {
          console.log(weatherData);
          // Extract and validate the relevant information
          const parsedData = weatherinput.parse({
            temp: weatherData.main.temp,
            temp_min: weatherData.main.temp_min,
            temp_max: weatherData.main.temp_max,
            pressure: weatherData.main.pressure,
            humidity: weatherData.main.humidity,
            wind_speed: Math.round(weatherData.wind.speed), // Convert to Int
            wind_deg: Math.round(weatherData.wind.deg),
            city_id: weatherData.id,
            city: weatherData.name,
            country: weatherData.sys.country,
            lon: weatherData.coord.lon,
            lat: weatherData.coord.lat,
            weather_code: weatherData.weather[0]?.id,
            weather_icon: weatherData.weather[0]?.icon,
            createdAt: new Date() // Current UTC timestamp
          });

          // Store the validated data
          return prisma.weather.create({
            data: parsedData,
          }).then(storedWeather => {
            // Return storedWeather
            return storedWeather;
          });
        });
      }
    });
  }),
});

export default weatherRouter;