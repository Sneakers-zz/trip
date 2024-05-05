import React from 'react';

const SkeletonCropCard: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col gap-2 p-4 border rounded-lg shadow">
      <div className="bg-gray-300 h-48 w-full rounded-md"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};

export default SkeletonCropCard;
