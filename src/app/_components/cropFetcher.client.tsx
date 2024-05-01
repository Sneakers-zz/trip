/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { api } from "~/trpc/react";
import CropCard from './cropCard'; // Ensure this path is correct

export function CropFetcher() {
  const [filter, setFilter] = useState("");

  // Assuming 'useQuery' returns an array of crops or null/undefined if no data is available.
  const { data, isLoading, error, refetch } = api.crop.fetchCrops.useQuery(
    { filter }, {
      enabled: false  // This prevents the query from running automatically
    });

    const handleFetchCrops = (e: React.FormEvent<HTMLFormElement>): Promise<unknown> => {
      e.preventDefault();
      return refetch()  // Assuming refetch returns a promise.
        .then(response => {
          console.log('Data refetched successfully:', response);
          return response;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          throw error;  // Rethrow or handle the error as necessary.
        });
    }

  return (
    <>
      <form onSubmit={handleFetchCrops} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter filter criteria"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Fetching..." : "Fetch Crops"}
        </button>
      </form>
      {error && <p className="text-red-500">Error fetching crops: {error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {data?.length ? (
        data.map(item => (
            <CropCard
                key={item.id}
                main_image_path={item.attributes.main_image_path ?? ''}
                name={item.attributes.name ?? 'Unknown Name'}
                binomial_name={item.attributes.binomial_name ?? 'Unknown Binomial Name'}
                description={item.attributes.description ?? 'No description available'}
                sun_requirements={item.attributes.sun_requirements ?? 'No sun requirements'}
                sowing_method={item.attributes.sowing_method ?? 'Sowing method not specified'}
                spread={item.attributes.spread ?? 0}
                row_spacing={item.attributes.row_spacing ?? 0}
                height={item.attributes.height ?? 0}
            />
        ))
    ) : (
        <p>No crops found or data is loading...</p>
    )}
</div>
    </>
  );  
}
