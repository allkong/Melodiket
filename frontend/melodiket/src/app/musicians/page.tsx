import CAROUSEL_DATAS from '@/constants/carousel';

import Header from '@/components/organisms/navigation/Header';
import Carousel from '@/components/molecules/carousel/Carousel';
import ControlsBar from '@/components/organisms/controls/ControlsBar';
import MusicianListSection from './_section/musician-list-section';

const Page = () => {
  return (
    <div>
      <Header isFixed />
      <Carousel data={CAROUSEL_DATAS} />
      <ControlsBar />
      <MusicianListSection />
    </div>
  );
};

export default Page;
