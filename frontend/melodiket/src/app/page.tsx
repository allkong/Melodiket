import Header from '@/components/organisms/navigation/Header';
import Carousel from '@/components/molecules/carousel/Carousel';
import TicketInfoCarousel from '@/components/molecules/carousel/TicketInfoCarousel';
import {
  CAROUSEL_DATAS,
  FAVORITE_MUSICIAN_LIST,
} from '@/constants/concertMocks';
import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import ConcertRankingSection from './_component/ConcertRankingSection';
import { HydrationBoundary } from '@tanstack/react-query';
import { useConcertListDehydrateState } from '@/services/concert/useConcertList';
import { Suspense } from 'react';
import ConcertRankingCardSkeleton from '@/components/molecules/card/ConcertRankingCardSkeleton';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-purple-100 overflow-y-auto">
      <Header />
      <div className="w-full px-7">
        <Carousel datas={CAROUSEL_DATAS} gap={4} size="lg" rounded />
        <div className="flex flex-col gap-6 my-3">
          <TicketInfoCarousel
            datas={['예매한 티켓이 없어요 T_T', '사실 잇지롱', 'A310 화이팅~']}
          />
          <div>
            <p className="text-xl font-medium">공연 랭킹</p>
            <section className="w-full py-2 overflow-x-auto">
              <div className="flex gap-2">
                <HydrationBoundary state={useConcertListDehydrateState()}>
                  <Suspense fallback={<ConcertRankingCardSkeleton count={5} />}>
                    <ConcertRankingSection />
                  </Suspense>
                </HydrationBoundary>
              </div>
            </section>
          </div>
          <div>
            <p className="text-xl font-medium">나의 뮤지션</p>
            <section className="w-full py-2 overflow-x-auto">
              <div className="flex gap-2">
                {FAVORITE_MUSICIAN_LIST.map((data) => (
                  <MusicianProfileCard key={data.index} {...data} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
