import React from 'react';
import CityData from '../_components/CityData';
import { api } from '~/trpc/server';

type WeatherData = {
  weather: Array<{ id: number, main: string, description: string, icon: string }>,
  main: { temp: number, temp_min: number, temp_max: number, humidity: number },
  wind: { speed: number, deg: number },
  coord: { lon: number, lat: number },
  sys: { country: string },
  id: number,
  name: string,
  dt: number,
};

const WeatherPage = async () => {
  // Fetch raw weather data on the server
  const rawWeatherData = await api.weather.fetchWeather();

  // Transform the raw data into the expected structure
  const weatherData: WeatherData = {
    weather: [{
      id: rawWeatherData.weather_code,
      main: '',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      description:rawWeatherData.weather_description,
      icon: rawWeatherData.weather_icon,
    }],
    main: {
      temp: rawWeatherData.temp,
      temp_min: rawWeatherData.temp_min,
      temp_max: rawWeatherData.temp_max,
      humidity: rawWeatherData.humidity,
    },
    wind: {
      speed: rawWeatherData.wind_speed,
      deg: rawWeatherData.wind_deg,
    },
    coord: {
      lon: rawWeatherData.lon,
      lat: rawWeatherData.lat,
    },
    sys: {
      country: rawWeatherData.country,
    },
    id: rawWeatherData.id,
    name: rawWeatherData.city,
    dt: rawWeatherData.createdAt.getTime(),
  };

  return (
    <>
      <CityData weatherData={weatherData} />
    </>
  );
};

export default WeatherPage;
