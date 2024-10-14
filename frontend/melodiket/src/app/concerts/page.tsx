'use client';

import { Suspense } from 'react';

import CAROUSEL_DATAS from '@/constants/carousel';

import Header from '@/components/organisms/navigation/Header';
import ConcertListSection from './_section/concert-list-section';
import Carousel from '@/components/molecules/carousel/Carousel';
import ControlsBar from '@/components/organisms/controls/ControlsBar';
import ControlsBarSkeleton from '@/components/organisms/controls/ControlsBarSkeleton';
import { useSearchParams } from 'next/navigation';
import { SORT_OPTIONS } from '@/constants/controlOptions';

const Page = () => {
  const searchParams = useSearchParams();
  const isNowBooking = searchParams.get('filter') === 'true' ? true : false;
  const currentSort = (searchParams.get('sort') ??
    'popularity') as keyof typeof SORT_OPTIONS;

  return (
    <div className="w-full">
      <Header isFixed />
      <Carousel data={CAROUSEL_DATAS} />
      <Suspense fallback={<ControlsBarSkeleton />}>
        <ControlsBar />
      </Suspense>
      <ConcertListSection
        isNowBooking={isNowBooking}
        currentSort={currentSort}
      />
    </div>
  );
};

export default Page;
