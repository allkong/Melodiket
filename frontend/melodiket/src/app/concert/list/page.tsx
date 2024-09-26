import dynamic from 'next/dynamic';

import Carousel from '@/components/molecules/carousel/Carousel';
import Header from '@/components/organisms/navigation/Header';
import { CAROUSEL_DATAS } from '@/constants/concertMocks';
import ConcertListSection from './_component/ConcertListSection';
import { Suspense } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';
import { useConcertListDehydrateState } from '@/services/concert/useConcertList';
import ConcertCardSkeleton from '@/components/molecules/card/ConcertCardSkeleton';

const ControlsBar = dynamic(
  () => import('@/components/organisms/controls/ControlsBar'),
  { ssr: false }
);

const Page = () => {
  return (
    <div className="w-full">
      <Header isFixed />
      <Carousel datas={CAROUSEL_DATAS} />
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
