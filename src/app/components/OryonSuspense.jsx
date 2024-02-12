import Loading from 'app/components/Loading';
import { Suspense } from 'react';

const OryonSuspense = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default OryonSuspense;
