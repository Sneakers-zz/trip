import React, { Suspense } from 'react';
import Loading from '~/app/_components/loading';


const Videocapture: React.FC = () => {
    return (
  
      <div className="dashboard-container"> 
        <Suspense fallback={<Loading />}>
         
        </Suspense>
      </div>
    );
  };
  
  export default Videocapture;