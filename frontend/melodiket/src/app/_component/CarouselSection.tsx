'use client';

import { useFetchCarouselList } from '@/services/concert/fetchConcert';
import Carousel from '@/components/molecules/carousel/Carousel';

const CarouselSection = () => {
  const { data } = useFetchCarouselList();

  return <>{data && <Carousel data={data} gap={4} size="lg" rounded />}</>;
};

export default CarouselSection;
