// src/server/api/routers/migrateData.ts
import { prisma } from "~/app/_components/prisma";
import { createClient } from "@supabase/supabase-js";



const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function migrateWeatherToSupabase()  {
    // Fetch data from MySQL using Prisma
    const mysqlData = await prisma.weather.findMany();

    // Insert data into Supabase
    for (const data of mysqlData) {
      // Check if a record with the same id already exists
      const existingRecordResponse = await supabase
        .from("Weather")
        .select("*")
        .eq("id", data.id)
        .single();

      if (existingRecordResponse.error) {
        console.error(
          "Error checking for existing record:",
          existingRecordResponse.error,
        );
        continue;
      } 

      const existingRecord = existingRecordResponse.data as {
        id: string;
      } | null;

      if (existingRecord) {
        // Record already exists, update it
        const updateResponse = await supabase
          .from("Weather")
          .update({
            temp: data.temp,
            temp_min: data.temp_min,
            temp_max: data.temp_max,
            pressure: data.pressure,
            humidity: data.humidity,
            wind_speed: data.wind_speed,
            wind_deg: data.wind_deg,
            city_id: data.city_id,
            city: data.city,
            country: data.country,
            lon: data.lon,
            lat: data.lat,
            weather_code: data.weather_code,
            weather_icon: data.weather_icon,
            weather_description: data.weather_description,
          })
          .eq("id", data.id)
          .single();

        if (updateResponse.error) {
          console.error(
            "Error updating existing record:",
            updateResponse.error,
          );
        }
      } else {
        // Record doesn't exist, insert it
        const { error: insertError } = await supabase.from("Weather").insert([
          {
            temp: data.temp,
            temp_min: data.temp_min,
            temp_max: data.temp_max,
            pressure: data.pressure,
            humidity: data.humidity,
            wind_speed: data.wind_speed,
            wind_deg: data.wind_deg,
            city_id: data.city_id,
            city: data.city,
            country: data.country,
            lon: data.lon,
            lat: data.lat,
            weather_code: data.weather_code,
            weather_icon: data.weather_icon,
            weather_description: data.weather_description,
          },
        ]);

        if (insertError) {
          console.error("Error inserting data:", insertError);
        }
      }
    }
    return { success: true };
}

  export async function migrateSensorDataToSupabase() {
    // Fetch data from MySQL using Prisma
    const mysqlData = await prisma.sensorData.findMany();

    // Insert data into Supabase
    for (const data of mysqlData) {
      // Check if a record with the same id already exists
      const existingRecordResponse = await supabase
        .from("SensorData")
        .select("*")
        .eq("id", data.id)
        .single();

      if (existingRecordResponse.error) {
        console.error(
          "Error checking for existing record:",
          existingRecordResponse.error,
        );
        continue;
      }

      const existingRecord = existingRecordResponse.data as {
        id: string;
      } | null;

      if (existingRecord) {
        // Record already exists, update it
        const updateResponse = await supabase
          .from("SensorData")
          .update({
            chipId: data.chipId,
            water1: data.water1,
            water2: data.water2,
            water3: data.water3,
            water4: data.water4,
            tempC: data.tempC,
            tempF: data.tempF,
            uvLight: data.uvLight,
          })
          .eq("id", data.id);

        if (updateResponse.error) {
          console.error(
            "Error updating existing record:",
            updateResponse.error,
          );
        }
      } else {
        // Record doesn't exist, insert it
        const insertResponse = await supabase.from("SensorData").insert([
          {
            chipId: data.chipId,
            water1: data.water1,
            water2: data.water2,
            water3: data.water3,
            water4: data.water4,
            tempC: data.tempC,
            tempF: data.tempF,
            uvLight: data.uvLight,
          },
        ]);

        if (insertResponse.error) {
          console.error("Error inserting data:", insertResponse.error);
        }
      }
    }

    return { success: true };
  }

  export async function migrateCropsToSupabase() {
    // Fetch data from MySQL using Prisma
    const mysqlData = await prisma.crop.findMany();

    // Insert data into Supabase
    for (const data of mysqlData) {
      // Check if a record with the same id already exists
  /*   const existingRecordResponse = await supabase
        .from("Crop")
        .select("*")
        .eq("id", data.id)
        .single();

      if (existingRecordResponse.error) {
        console.error(
          "Error checking for existing record:",
          existingRecordResponse.error,
        );
        continue;
      } 

      const existingRecord = existingRecordResponse.data as {
        id: string;
      } | null; */
const existingRecord = false;
      if (existingRecord) {
        // Record already exists, update it
        const updateResponse = await supabase
          .from("Crop")
          .update({
            id: data.id,
            name: data.name,
            binomialName: data.binomialName,
            description: data.description,
            sunRequirements: data.sunRequirements,
            spread: data.spread,
            rowSpacing: data.rowSpacing,
            height: data.height,
            processingPictures: data.processingPictures,
            guidesCount: data.guidesCount,
            mainImagePath: data.mainImagePath,
            taxon: data.taxon,
            growingDegreeDays: data.growingDegreeDays,
            svgIcon: data.svgIcon,
          })
          .eq("id", data.id);

        if (updateResponse.error) {
          console.error(
            "Error updating existing record:",
            updateResponse.error,
          );
        }
      } else {
        // Record doesn't exist, insert it
        const insertResponse = await supabase.from("Crop").insert([
          {
            id: data.id,
            name: data.name,
            binomialName: data.binomialName,
            description: data.description,
            sunRequirements: data.sunRequirements,
            sowingMethod: data.sowingMethod,
            spread: data.spread, // Replace null with a default value (e.g., 0)
            rowSpacing: data.rowSpacing,
            height: data.height,
            processingPictures: data.processingPictures, // Replace null with an empty string
            guidesCount: data.guidesCount, // Replace null with a default value (e.g., 0)
            mainImagePath: data.mainImagePath,
            taxon: data.taxon, // Replace null with an empty string
            growingDegreeDays: data.growingDegreeDays, // Replace null with a default value (e.g., 0)
            svgIcon: data.svgIcon, // Replace null with an empty string
          },
          console.log(data)
        ]);
        

        if (insertResponse.error) {
          console.error("Error inserting data:", insertResponse.error);
        }
      }
    }

    return { success: true };
  }