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


export type FetchWeatherInputType = z.infer<typeof FetchWeatherInput>;
  // Define the schema for the input using Zod
  export const FetchCropsInput = z.object({
    filter: z.string(),
  });
  export const FetchWeatherInput = z.object({
  });

    // You can also export the inferred type from the Zod schema
export type FetchCropsInputType = z.infer<typeof FetchCropsInput>;