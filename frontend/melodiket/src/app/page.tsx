import Header from '@/components/organisms/navigation/Header';
import Carousel from '@/components/molecules/carousel/Carousel';
import TicketInfoCarousel from '@/components/molecules/carousel/TicketInfoCarousel';
import { CAROUSEL_DATAS } from '@/constants/concertList';

export default function Home() {
  return (
    <div className="w-full h-screen bg-purple-100 overflow-y-auto">
      <Header />
      <div className="w-full h-full px-7">
        <Carousel datas={CAROUSEL_DATAS} gap={4} size="lg" rounded />
        <div className="flex flex-col gap-6 mt-3">
          <TicketInfoCarousel
            datas={['예매한 티켓이 없어요 T_T', '사실 잇지롱', 'A310 화이팅~']}
          />
          <div className="space-y-4">
            <p className="text-xl font-medium">공연 랭킹</p>
            <section>공연 포스터</section>
          </div>
          <div className="space-y-4">
            <p className="text-xl font-medium">나의 뮤지션</p>
            <section className="h-96">내 뮤지션들</section>
          </div>
        </div>
      </div>
    </div>
  );
}
