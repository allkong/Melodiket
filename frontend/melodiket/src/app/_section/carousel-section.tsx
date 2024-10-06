'use client';

import Carousel from '@/components/molecules/carousel/Carousel';
import CAROUSEL_DATAS from '@/constants/carousel';

const CarouselSection = () => {
  return <Carousel data={CAROUSEL_DATAS} gap={4} size="lg" rounded />;
};

export default CarouselSection;
