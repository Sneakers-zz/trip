// src/app/search/page.tsx
// Assuming the parent component file: src/app/someParentComponent.client.tsx
'use client';
import React from "react";
import {CropFetcher} from "../_components/cropFetcher";  // No need for `?client` because the extension is enough





// Your page component.
const SearchPage = () => {
  // Render your components using the data from the loader.
  return (
    <>
      <CropFetcher />
    </>
  );
};

export default SearchPage;
