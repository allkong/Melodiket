import dynamic from 'next/dynamic';

import Header from '@/components/organisms/navigation/Header';
import ConcertListSection from './_component/ConcertListSection';
import { Suspense } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';
import { useConcertListDehydrateState } from '@/services/concert/fetchConcertList';
import ConcertCardSkeleton from '@/components/molecules/card/ConcertCardSkeleton';
import CarouselSection from './_component/CarouselSection';

const ControlsBar = dynamic(
  () => import('@/components/organisms/controls/ControlsBar'),
  { ssr: false }
);

const Page = () => {
  return (
    <div className="w-full">
      <Header isFixed />
      <CarouselSection />
      <ControlsBar />
      <div className="px-3 grid grid-flow-row lg:grid-cols-3 grid-cols-2 w-full place-items-center">
        <HydrationBoundary state={useConcertListDehydrateState()}>
          <Suspense fallback={<ConcertCardSkeleton count={10} />}>
            <ConcertListSection />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default Page;
