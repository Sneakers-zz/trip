// croptypes.ts


export interface ApiResponse {  data: Crop[] }  
//crop card

export interface CropCardProps {
  main_image_path: string;
  name: string;
  binomial_name: string;
  description: string;
  sun_requirements: string;
  sowing_method?: string;
  spread: number;
  row_spacing: number;
  height: number;
}


/**
 * Represents a crop type, including its attributes such as name, binomial name, description, sun requirements, sowing method, spread, row spacing, height, main image path, common names, guides count, growing degree days, SVG icon, tags, taxon, and whether processing pictures are available.
 */
export interface Crop {
  type: string;
  id: string;
  attributes: {
    name: string;
    binomial_name: string | null;
    description: string | null;
    sun_requirements: string | null;
    sowing_method: string | null;
    spread: number | null;
    row_spacing: number | null;
    height: number | null;
    main_image_path?: string | undefined;
    common_names?: string[];
    guides_count?: number;
    growing_degree_days?: number;
    svg_icon?: string;
    taxon?: string;
    processing_pictures?: boolean;
  };
}