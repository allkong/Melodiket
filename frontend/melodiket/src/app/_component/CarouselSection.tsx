import { fetchCarouselConcertList } from '@/services/concert/fetchConcertList';
import Carousel from '@/components/molecules/carousel/Carousel';

const CarouselSection = async () => {
  const datas = await fetchCarouselConcertList();

  return <Carousel datas={datas} gap={4} size="lg" rounded />;
};

export default CarouselSection;
