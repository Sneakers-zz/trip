/* eslint-disable @next/next/no-img-element */

//CityData.tsx
'use client'
import React from 'react';
import { api } from "~/trpc/react";


const CityData = () => {
  const { data: weatherData, isLoading, isError, error } = api.weather.fetchWeather.useQuery();
  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  return (
    <div className="mt-5">

      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/w/${weatherData.weather[0]?.icon}.png`}
            alt="Weather icon"
            height="100px"
            width="100px"
          />
          <span className="text-gray-500">
            {weatherData.weather[0]?.description}
          </span>
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
};

export default CityData;