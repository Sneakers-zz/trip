// croptypes.ts


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
    tags_array?: string[];
    taxon?: string;
    processing_pictures?: boolean;
  };
  links?: object;
  relationships?: object;
}