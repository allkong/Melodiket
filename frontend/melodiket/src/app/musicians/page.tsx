import dynamic from 'next/dynamic';

import Header from '@/components/organisms/navigation/Header';
import MusicianItem from '@/components/molecules/item/MusicianItem';
const ControlsBar = dynamic(
  () => import('@/components/organisms/controls/ControlsBar'),
  { ssr: false }
);

const Page = () => {
  return (
    <div>
      <Header isFixed />
      <div className="h-40 bg-gray-200"></div>
      <ControlsBar />
      <div>
        <MusicianItem
          src={''}
          musicianName={'장원영'}
          favoriteCount={10}
          bookingCount={2}
          isFavorite
        />
      </div>
    </div>
  );
};

export default Page;
