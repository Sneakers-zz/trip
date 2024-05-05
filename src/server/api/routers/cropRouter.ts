// cropsRouter.ts
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { fetchCropsFromAPI } from '~/app/_components/apiClient';
import {FetchCropsInput, type FetchCropsInputType} from '~/app/_components/datatype';
import { insertCropData } from '~/app/_components/databaseUtils';

export const cropsRouter = createTRPCRouter({
  // ... other procedures

  fetchCrops: publicProcedure
  .input(FetchCropsInput)
  .query(async ({ input }: { input: FetchCropsInputType }) => {
    // Here we fetch the data using the fetchCropsFromAPI function
    const data = await fetchCropsFromAPI(input.filter);

    // Then we filter out the crops without images
    const cropsWithImages = data.data.filter(crop =>
      crop.attributes.main_image_path?.startsWith('https')
    );

    // Optionally, insert the filtered data into the database
     await insertCropData(cropsWithImages);

    // Finally, we return the filtered data
    return cropsWithImages;
  }),

  // ... other procedures
});

export default cropsRouter;
