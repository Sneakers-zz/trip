import React from 'react';

interface CrudShowcaseProps {
  secretMessage: string; // This is where you define the prop's type
}

const CrudShowcase: React.FC<CrudShowcaseProps> = () => {


  // Render your secret message
  return (
    <div className="w-full max-w-xs">
      <p className="truncate">Latest Crop: {}</p>
    </div>
  );
};

export default CrudShowcase;