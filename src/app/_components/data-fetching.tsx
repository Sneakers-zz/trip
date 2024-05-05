"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { api } from "~/trpc/react";
import "chartjs-adapter-date-fns";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DataFetching: React.FC = () => {
  const { data: weatherData, isLoading: isLoadingWeather } =
    api.dbdumpdata.getWeatherData.useQuery();
  const { data: cropsData, isLoading: isLoadingCrops } =
    api.dbdumpdata.getCropsData.useQuery();
  const { data: SensorData, isLoading: isLoadingSensor } =
    api.dbdumpdata.getSensorData.useQuery();

  if (isLoadingWeather || isLoadingCrops || isLoadingSensor) {
    return <p>Loading...</p>;
  }

   return (
    <div className="dashboard">
      <h2>Weather and Crop Dashboard</h2>

      {/* Weather Data */}
      <div className="weatherdata">
        <h3>Weather Data</h3>
        <ul>
          {weatherData?.map((weather) => (
            <li key={weather.id}>
              {weather.temp}{" "}
              {weather.createdAt.toLocaleString() ?? "Unknown Weather"}
            </li>
          ))}
        </ul>
      </div>

      {/* Sensor Data */}
      <div className="sensor-data">
        <h3>Sensor Data</h3>
        <ul>
          {SensorData?.map((sensor) => (
            <li key={sensor.id}>
              {sensor.tempC}{" "}
              {sensor.createdAt.toLocaleString() ?? "Unknown Temp"}
            </li>
          ))}
        </ul>
      </div>

      {/* Crops Planted */}
      <div className="crops-planted">
        <h3>Crops Planted</h3>
        <ul>
          {cropsData?.map((crop) => (
            <li key={crop.id}>
              {crop.name} {crop.id ?? "Unknown Crop"}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

 // Extract temperature data
  /*const temperatureChartData = {
    labels: temperatureData.map(entry => entry.main.pressure),
    datasets: [
      {
        label: 'Temperature over Time',
        data: temperatureData.map((entry) => entry.main.temp),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };
  const temperatureChartOptions = {
    scales: {
      y: {
        min: -10,
        max: 40,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
          tooltipFormat: 'yyyy-MM-dd',
          displayFormats: {
            day: 'yyyy-MM-dd',
          },
        },
      },
    },
  }; 
  
  
  
  
  
    <div className="temperature-chart">
    <h3>Temperature over Time</h3>
   <Line data={temperatureChartData} options={temperatureChartOptions} /> 
  </div>
  
  
  */


export default DataFetching;
