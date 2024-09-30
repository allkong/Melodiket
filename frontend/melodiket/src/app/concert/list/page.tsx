import dynamic from 'next/dynamic';

import Header from '@/components/organisms/navigation/Header';
import ConcertListSection from './_component/ConcertListSection';
import { HydrationBoundary } from '@tanstack/react-query';
import {
  useFetchCarouselListDehydrateState,
  useFetchConcertListDehydrateState,
} from '@/services/concert/fetchConcert';
import CarouselSection from './_component/CarouselSection';

const ControlsBar = dynamic(
  () => import('@/components/organisms/controls/ControlsBar'),
  { ssr: false }
);

const Page = async () => {
  return (
    <div className="w-full">
      <Header isFixed />
      <HydrationBoundary state={await useFetchCarouselListDehydrateState()}>
        <CarouselSection />
      </HydrationBoundary>
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
