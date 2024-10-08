import CAROUSEL_DATAS from '@/constants/carousel';

import Header from '@/components/organisms/navigation/Header';
import ConcertListSection from './_section/concert-list-section';
import Carousel from '@/components/molecules/carousel/Carousel';
import ControlsBar from '@/components/organisms/controls/ControlsBar';

const Page = async () => {
  return (
    <div className="w-full">
      <Header isFixed />
      <Carousel data={CAROUSEL_DATAS} />
      <ControlsBar />
      <ConcertListSection />
    </div>
  );
};

export default Page;
