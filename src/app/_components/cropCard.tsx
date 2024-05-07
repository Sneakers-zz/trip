/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { type CropCardProps } from './croptype';
import ImageWithFallback from './imageWithFallBack';



const CropCard: React.FC<CropCardProps> = ({
    main_image_path,
    name,
    binomial_name,
    description,
    sun_requirements,
    sowing_method,
    spread,
    row_spacing,
    height
}) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4">
                <ImageWithFallback
                  src={main_image_path}
                  alt={name}
                  width={100}
                  height={100}
                  defaultSrc="/default-crop-image.jpg"
                />
           
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{name}</h3>
                <div className="text-gray-800 mb-2">Biological Name: {binomial_name}</div>
                <p className="text-gray-700 text-base">{description}</p>
                <p className="text-gray-600">Sun Requirements: {sun_requirements}</p>
                <p className="text-gray-600">Sowing Method: {sowing_method ?? "Not specified"}</p>
                <p className="text-gray-600">Spread: {spread} cm</p>
                <p className="text-gray-600">Row Spacing: {row_spacing} cm</p>
                <p className="text-gray-600">Height: {height} cm</p>
            </div>
        </div>
    );
};

export default CropCard;