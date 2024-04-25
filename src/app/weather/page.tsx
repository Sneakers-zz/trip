// src/app/weather/page.tsx
// Assuming the parent component file: src/app/someParentComponent.client.tsx
'use client';
import React from "react";
import CityData from "../_components/CityData";  // No need for `?client` because the extension is enough

// Your page component.
const WeatherPage = () => {
  // Render your components using the data from the loader.
  return (
    <>
      <CityData />
    </>
  );
};

export default WeatherPage;
