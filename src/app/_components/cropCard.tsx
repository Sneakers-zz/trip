/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { type CropCardProps } from './datatype';

const CropCard: React.FC<CropCardProps> = ({ crop }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4">
            <img src={crop.main_image_path} alt={crop.name} className="w-full h-56 object-cover object-center"/>
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{crop.name}</h3>
                <div className="text-gray-800 mb-2">Biological Name: {crop.binomial_name}</div>
                <p className="text-gray-700 text-base">{crop.description}</p>
                <p className="text-gray-600">Sun Requirements: {crop.sun_requirements}</p>
                <p className="text-gray-600">Sowing Method: {crop.sowing_method ?? "Not specified"}</p>
                <p className="text-gray-600">Spread: {crop.spread} cm</p>
                <p className="text-gray-600">Row Spacing: {crop.row_spacing} cm</p>
                <p className="text-gray-600">Height: {crop.height} cm</p>
            </div>
        </div>
    );
};

export default CropCard;