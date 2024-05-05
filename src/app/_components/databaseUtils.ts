

import {PrismaClient } from '@prisma/client'
import { type Crop } from '~/app/_components/datatype';


const prisma = new PrismaClient()


export async function insertCropData(cropData: Crop[]): Promise<void> {
  // ... your insertion logic
    for (const crop of cropData) {
      const { attributes, } = crop;

      // Check if a crop with the same ID already exists
    const existingCrop = await prisma.crop.findUnique({
      where: {
        id: crop.id,
      },
    });

    if (existingCrop) {
      console.warn(`Skipping crop with duplicate id: ${crop.id}`);
      continue;
    }
      const truncatedDescription = attributes.description?.slice(0, 190);
      const truncatedSow = attributes.sowing_method?.slice(0, 190);
      // Handle common names as separate inserts if they exist
      const commonNames = attributes.common_names?.map(name => ({ name }));
  
      // Start a transaction to ensure data integrity
     // Start a transaction to ensure data integrity
     await prisma.$transaction(async (prisma) => {
      // Insert the main crop data
      
      const newCrop = await prisma.crop.create({
        data: {
          id: crop.id,
          name: attributes.name,
      
          binomialName: attributes.binomial_name,
          description: truncatedDescription,
          sunRequirements: attributes.sun_requirements,
          sowingMethod: truncatedSow,
          spread: attributes.spread,
          rowSpacing: attributes.row_spacing,
          height: attributes.height,
          
          guidesCount: attributes.guides_count,
          mainImagePath: attributes.main_image_path,
          taxon: attributes.taxon,
          tagsArray: attributes.tags_array,
          growingDegreeDays: attributes.growing_degree_days,
          svgIcon: attributes.svg_icon,
        },
        include: {
          commonNames: true,
          pictures: true, // Assume you have logic to handle picture inserts
          companions: true, // Assume you have logic to handle companion inserts
        },
      });

      // If common names exist, create them
      if (commonNames && commonNames.length > 0) {
        for (const name of commonNames) {
          await prisma.commonName.create({
            data: {
              name: name.name,
              cropId: newCrop.id,
            },
          });
        }
      }

      return newCrop;
    });
  }
}