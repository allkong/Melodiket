import CAROUSEL_DATAS from '@/constants/carousel';

import Header from '@/components/organisms/navigation/Header';
import MusicianItem from '@/components/molecules/item/MusicianItem';
import Carousel from '@/components/molecules/carousel/Carousel';
import ControlsBar from '@/components/organisms/controls/ControlsBar';

const Page = () => {
  return (
    <div>
      <Header isFixed />
      <Carousel data={CAROUSEL_DATAS} />
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
