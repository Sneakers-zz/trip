// types.ts (or wherever you'd like to define your types)

import { z } from 'zod';


export interface Session {
    user?: {
      name: string;
      // ... other user session properties
    };
  }
  export interface SearchPageProps {
    hello: string; // Adjust the type according to what 'hello' actually is
    secretMessage: string; // Adjust the type if 'secretMessage' is not a string
  }
  // Define the schema for the input using Zod
  export const FetchCropsInput = z.object({
    filter: z.string(),
  });
  export const FetchWeatherInput = z.object({
  });
  // You can also export the inferred type from the Zod schema
export type FetchCropsInputType = z.infer<typeof FetchCropsInput>;

export interface ApiResponse {  data: Crop[] }  
//crop card
export interface CropAttributes {
  name: string;
  binomial_name: string;
  description: string;
  sun_requirements: string| null;
  sowing_method: string | null;
  spread: number;
  row_spacing: number;
  height: number;
  main_image_path: string;
}

export interface CropCardProps {
  crop: CropAttributes;
}

//crops
export interface Crop {
  type: string;
  id: string;
  attributes: CropAttributes;
  links: CropLinks;
  relationships: CropRelationships;
}

export interface CropAttributes {
  name: string;
  slug: string;
  binomial_name: string;
  common_names: string[];
  description: string;
  sun_requirements: string | null;
  sowing_method: string | null;
  spread: number;
  row_spacing: number;
  height: number;
  processing_pictures: number;
  guides_count: number;
  main_image_path: string;
  taxon: string | null;
  tags_array: string[];
  growing_degree_days: number | null;
  svg_icon: string | null;
}

export interface CropLinks {
  self: LinkDetails;
}

export interface LinkDetails {
  api: string;
  website: string;
}

export interface CropRelationships {
  companions: RelationshipDetail;
  pictures: RelationshipDetailWithPictures;
}

export interface RelationshipDetail {
  links: {
    related: string;
  };
}

export interface RelationshipDetailWithPictures {
  links: {
    related: string;
  };
  data: PictureData[];
}

export interface PictureData {
  type: string;
  id: string;
}

export type FetchWeatherInputType = z.infer<typeof FetchWeatherInput>;
//openweather datatypes
export interface Data {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface SensorData {
  chipId: number;
  "water 1": number;
  "water 2": number;
  "water 3": number;
  "water 4": number;
  "Temp C": number;
  "Temp F": number;
  Uvlight: number;
}