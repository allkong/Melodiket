import dynamic from 'next/dynamic';

import Carousel from '@/components/molecules/carousel/Carousel';
import Header from '@/components/organisms/navigation/Header';
const ControlsBar = dynamic(
  () => import('@/components/organisms/controls/ControlsBar'),
  { ssr: false }
);
import ConcertCard from '@/components/molecules/card/ConcertCard';
import { CAROUSEL_DATAS, CONCERT_LIST } from '@/constants/concertList';

const Page = () => {
  return (
    <div className="w-full">
      <Header isFixed />
      <Carousel datas={CAROUSEL_DATAS} />
      <ControlsBar />
      <div className="px-3 grid grid-flow-row lg:grid-cols-3 grid-cols-2 w-full place-items-center">
        {CONCERT_LIST.map((concert) => (
          <ConcertCard key={concert.concertId} {...concert} />
        ))}
      </div>
    </div>
  );
};

export default Page;
