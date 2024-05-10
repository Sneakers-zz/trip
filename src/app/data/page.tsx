'use client'
import React from "react";
import { api } from "~/trpc/react";

 function SomeComponent() {
  const { mutate, error } = api.sensordata.addSensorData.useMutation();  // Assuming `isFetching` is the correct property

  const handleSubmit = async (data: { chipId: number; water1: number; water2: number; water3: number; water4: number; tempC: number; tempF: number; uvLight: number; }) => {
  //  console.log('Sending data:', data);  // Log the data before sending it   
    try {
      const response =  mutate(data); // Assuming `mutate` returns a promise
   //   console.log('Response:', response);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <>
    <form onSubmit={(e) => {
      e.preventDefault();
     /* handleSubmit({
        chipId: 12,
        water1: 23,
        water2: 23,
        water3: 0,
        water4: 0,
        tempC: 20.25,
        tempF: 68.45,
        uvLight: 4.747, 
    });
    }}> */}}>
      <button type="submit" >Submit</button>  
      {error && <p>Error: {error.message}</p>}
    </form>
    </>
  );
}
// Your page component.
const DataPage = () => {
  // Render your components using the data from the loader.
  return (
    <>
      <SomeComponent />
    </>
  );
};

export default DataPage;