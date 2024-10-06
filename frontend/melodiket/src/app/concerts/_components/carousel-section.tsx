'use client';

import Carousel from '@/components/molecules/carousel/Carousel';
import { useFetchCarouselList } from '@/services/concert/fetchConcert';

const CarouselSection = () => {
  const { data } = useFetchCarouselList();

  return <>{data && <Carousel data={data} />}</>;
};

export default CarouselSection;
