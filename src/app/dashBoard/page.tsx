import React, { Suspense } from 'react';
import DataFetching from '../_components/data-fetching';
import Loading from '../_components/loading';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Suspense fallback={<Loading />}>
        <DataFetching />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
