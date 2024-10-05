import dynamic from 'next/dynamic';

import Header from '@/components/organisms/navigation/Header';
import ConcertListSection from './_component/concert-list-section';
import { HydrationBoundary } from '@tanstack/react-query';
import { useFetchConcertListDehydrateState } from '@/services/concert/fetchConcert';
import CarouselSection from './_component/carousel-section';

const ControlsBar = dynamic(
  () => import('@/components/organisms/controls/ControlsBar'),
  { ssr: false }
);

const Page = async () => {
  return (
    <div className="w-full">
      <Header isFixed />
      <CarouselSection />
      <ControlsBar />
      <div className="px-3 grid grid-flow-row lg:grid-cols-3 grid-cols-2 w-full place-items-center">
        <HydrationBoundary state={await useFetchConcertListDehydrateState()}>
          <ConcertListSection />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default Page;
