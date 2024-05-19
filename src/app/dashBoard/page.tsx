import React, { Suspense } from 'react';
import DataFetching from '../_components/data-fetching';
import Loading from '../_components/loading';
import DataPushing from '../_components/datareplicateSupabase';
import DBCheck from '../_components/supabasedatabaseconnect';


const DashboardPage: React.FC = () => {
  return (

    <div className="dashboard-container"> <DBCheck />
        <DataPushing />
      <Suspense fallback={<Loading />}>
        <DataFetching />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
