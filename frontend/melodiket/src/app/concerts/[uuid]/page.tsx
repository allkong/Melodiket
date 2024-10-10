'use client';

import Header from '@/components/organisms/navigation/Header';
import ConcertPoster from './_components/concert-poster';
import ConcertInformation from './_components/concert-information';

interface PageProps {
  params: { uuid: string };
}

const Page = ({ params }: PageProps) => {
  return (
    <div className="flex flex-col w-full min-h-screen h-fit pb-10 bg-white">
      <Header isFixed />
      <ConcertPoster uuid={params.uuid} />
      <ConcertInformation uuid={params.uuid} />
    </div>
  );
};

export default Page;
