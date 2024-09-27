import LargeButton from '@/components/atoms/button/LargeButton';
import Header from '@/components/organisms/navigation/Header';
import ConcertPosterSection from './_components/ConcertPosterSection';
import { HydrationBoundary } from '@tanstack/react-query';
import { useFetchConcertDetailDehydrateState } from '@/services/concert/fetchConcert';
import ConcertInformationSection from './_components/ConcertInformationSection';

const Page = async () => {
  return (
    <div className="flex flex-col w-full min-h-screen h-fit pb-10 bg-white">
      <Header isFixed />
      <HydrationBoundary
        state={await useFetchConcertDetailDehydrateState('test')}
      >
        <ConcertPosterSection />
        <ConcertInformationSection />
      </HydrationBoundary>
      <div className="fixed w-full max-w-xl mx-auto bottom-0 px-6 py-3 bg-white">
        <LargeButton label="예매하기" />
      </div>
    </div>
  );
};

export default Page;
