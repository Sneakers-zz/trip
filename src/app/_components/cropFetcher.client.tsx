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

  const handleFetchCrops = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   void  refetch(); // Manually trigger the query
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
            <CropCard key={item.id} crop={item.attributes} />
          ))
        ) : (
          <p>No crops found or data is loading...</p>
        )}
      </div>
    </>
  );  
}
