
import { createClient } from "@supabase/supabase-js";
import { type Crop } from './croptype';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertCropData(cropData: Crop[]): Promise<void> {
  for (const crop of cropData) {
    const { attributes } = crop;

    const existingCrop = await supabase
      .from("Crop")
      .select("*")
      .eq("id", crop.id)
      .single();

    if (existingCrop.data) {
      console.warn(`Skipping crop with duplicate id: ${crop.id}`);
      continue;
    }

    const truncatedDescription = attributes.description?.slice(0, 190);
    const truncatedSow = attributes.sowing_method?.slice(0, 190);

    const { error } = await supabase.from("Crop").insert([
      {
        id: crop.id,
        name: attributes.name,
        binomial_name: attributes.binomial_name,
        description: truncatedDescription,
        sun_requirements: attributes.sun_requirements,
        sowing_method: truncatedSow,
        spread: attributes.spread ?? 0,
        row_spacing: attributes.row_spacing ?? 0,
        height: attributes.height ?? 0,
        guides_count: attributes.guides_count ?? 0,
        main_image_path: attributes.main_image_path,
        taxon: attributes.taxon ?? "",
        growing_degree_days: attributes.growing_degree_days ?? 0,
        svg_icon: attributes.svg_icon ?? "",
      },
    ]);

    if (error) {
      console.error("Error inserting crop data:", error);
    }
  }
}

/*
import { type Crop } from './croptype';
import { prisma } from '~/app/_components/prisma';




export async function insertCropData(cropData: Crop[]): Promise<void> {
  for (const crop of cropData) {
    const { attributes } = crop;

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
    
    await prisma.$transaction(async (prisma) => {
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
          growingDegreeDays: attributes.growing_degree_days,
          svgIcon: attributes.svg_icon,
        },
      });
      return newCrop;
    });
  }
}*/
