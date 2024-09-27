import Carousel from '@/components/molecules/carousel/Carousel';
import { fetchCarouselConcertList } from '@/services/concert/fetchConcertList';

const CarouselSection = async () => {
  const datas = await fetchCarouselConcertList();

  return <Carousel datas={datas} />;
};

export default CarouselSection;
