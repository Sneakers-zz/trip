'use client';
import React from "react";
import { api } from "~/trpc/react";

const DataPushing: React.FC = () => {
    const migrateCropsToSupabase = api.dbdumpdata.migrateCropsToSupabase.useMutation();
    const migrateSensorDataToSupabase = api.dbdumpdata.migrateSensorDataToSupabase.useMutation();
    const migrateWeatherToSupabase = api.dbdumpdata.migrateWeatherToSupabase.useMutation();
  
    const handleMigration = async () => {
      try {
        console.log("Yopes, migration started!");
        await migrateCropsToSupabase.mutateAsync();
        console.log("Data Crop migration successful!");
        await migrateSensorDataToSupabase.mutateAsync();
        console.log("Data Sensor migration successful!");
        await migrateWeatherToSupabase.mutateAsync();
        console.log("Data weather migration successful!");
      } catch (error) {
        console.error("Data migration failed:", error);
      }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-lg font-bold mb-4">Data Pushing</p>
          <button
            onClick={handleMigration}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Migrate Data to Supabase
          </button>
        </div>
      );
};

export default DataPushing;
