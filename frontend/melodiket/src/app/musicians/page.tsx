import { Suspense } from 'react';

import CAROUSEL_DATAS from '@/constants/carousel';

import Header from '@/components/organisms/navigation/Header';
import Carousel from '@/components/molecules/carousel/Carousel';
import ControlsBar from '@/components/organisms/controls/ControlsBar';
import MusicianListSection from './_section/musician-list-section';
import ControlsBarSkeleton from '@/components/organisms/controls/ControlsBarSkeleton';

const Page = () => {
  return (
    <div>
      <Header isFixed />
      <Carousel data={CAROUSEL_DATAS} />
      <Suspense fallback={<ControlsBarSkeleton />}>
        <ControlsBar isFilter={false} />
      </Suspense>
      <MusicianListSection />
    </div>
  );
};

export default Page;
