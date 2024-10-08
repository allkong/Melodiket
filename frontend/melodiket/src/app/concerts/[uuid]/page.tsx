import Header from '@/components/organisms/navigation/Header';
import ConcertPoster from './_components/concert-poster';
import { HydrationBoundary } from '@tanstack/react-query';
import { useFetchConcertDetailDehydrateState } from '@/services/concert/fetchConcert';
import ConcertInformation from './_components/concert-information';

interface PageProps {
  params: { uuid: string };
}

const Page = async ({ params }: PageProps) => {
  return (
    <div className="flex flex-col w-full min-h-screen h-fit pb-10 bg-white">
      <Header isFixed />
      <HydrationBoundary
        state={await useFetchConcertDetailDehydrateState(params.uuid)}
      >
        <ConcertPoster uuid={params.uuid} />
        <ConcertInformation uuid={params.uuid} />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
