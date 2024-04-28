/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// apiClient.ts
import { z } from 'zod';
import {type Data } from './datatype';  // Make sure this path is correct

const ApiResponseSchema = z.object({
    data: z.array(z.object({
    type: z.string(),
    id: z.string(),
    attributes: z.object({
    name: z.string(),
    main_image_path: z.string().optional(),
        // Add more fields as necessary
      })
    }))
  });

  export type ApiResponse = z.infer<typeof ApiResponseSchema>;
// Then, validate the response in your API call
export async function fetchCropsFromAPI(filter: string): Promise<ApiResponse> {
  const response = await fetch(`https://openfarm.cc/api/v1/crops/?filter=${filter}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch crops data: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  // Validate the response structure with zod
  const result = ApiResponseSchema.parse(json); // This will throw if the data does not match the schema
  return result;
}


export async function fetchWeather(headers: Record<string, string> = {}): Promise<Data> {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const lat = "48.42";
  const lon = "-123.36";
  const units ="metric";
  const apiKey = process.env.OPENWEATHERAPI; // Ensure this is securely configured
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  // Prepare headers
  const defaultHeaders = new Headers({
      "Cache-Control": "max-age=3600, immutable"
  });

  // Merge any additional headers provided
  Object.entries(headers).forEach(([key, value]) => defaultHeaders.set(key, value));

  const myInit: RequestInit = {
      method: "GET",
      headers: defaultHeaders,
      mode: "cors",
      //cache: "default" // Use a valid RequestCache value
  };

  const response = await fetch(url, myInit);
  
  if (!response.ok) {
      throw new Error('Failed to fetch weather data');
  }

  const weatherData: Data = await response.json();
  return weatherData;
};