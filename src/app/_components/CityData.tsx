
// src/app/_components/CityData.tsx
'use client';

import React, { memo } from 'react';
import Image from 'next/image';

type WeatherData = {
  weather: Array<{ id: number, main: string, description: string, icon: string }>,
  main: { temp: number, temp_min: number, temp_max: number, humidity: number },
  wind: { speed: number },
};

const CityData = memo(({ weatherData }: { weatherData: WeatherData }) => {
  if (!weatherData) {
    return <div>No weather data available.</div>;
  }
  return (
    <div className="mt-5">
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <Image
            src={`https://openweathermap.org/img/w/${weatherData.weather[0]?.icon}.png`}
            alt="Weather icon"
            height={100}
            width={100}
          />
        </div>
        <div className="flex flex-col gap-5">
        {weatherData.weather[0]?.description}
        </div>
       
        <div className="flex flex-col gap-5">
          <div className="text-6xl">{weatherData.main.temp}°C</div>
          <span className="text-gray-500">
            {weatherData.main.temp_min}°C/{weatherData.main.temp_max}°C
          </span>
        </div>

        <div className="flex flex-col gap-2 items-center text-gray-500">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-wind fa-beat"></i>
            <span>{weatherData.wind.speed} mph</span>
          </div>

          <div className="flex items-center gap-3">
            <i className="fa-solid fa-droplet fa-beat"></i>
            <span>{weatherData.main.humidity} g/m³</span>
          </div>

        </div>
      </div>
    </div>
  );
});

// Set the display name
CityData.displayName = 'CityData';

export default CityData;