import dynamic from 'next/dynamic';

import Header from '@/components/organisms/navigation/Header';
import ConcertListSection from './_section/concert-list-section';
import CarouselSection from './_section/carousel-section';

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
      <ConcertListSection />
    </div>
  );
};

export default Page;
