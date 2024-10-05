'use client';

import Header from '@/components/organisms/navigation/Header';
import TicketInfoCarousel from '@/components/molecules/carousel/TicketInfoCarousel';
import ConcertRankingSection from './_component/concert-ranking-section';
import FavoriteMusicianSection from './_component/favorite-musician-section';

import CarouselSection from './_component/carousel-section';
import useAuthStore from '@/store/authStore';
import NeedLogin from './_component/need-login';
import { Suspense } from 'react';
import ConcertRankingCardSkeleton from '@/components/molecules/card/ConcertRankingCardSkeleton';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="w-full min-h-screen overflow-y-auto bg-purple-100">
      <Header isFixed />
      <div className="w-full mt-16 px-7">
        <CarouselSection />
        <div className="flex flex-col gap-6 my-3">
          <TicketInfoCarousel
            datas={['예매한 티켓이 없어요 T_T', '사실 잇지롱', 'A310 화이팅~']}
          />
          <div>
            <p className="text-xl font-medium">공연 랭킹</p>
            <section className="w-full py-2 overflow-x-auto">
              <div className="flex gap-2">
                <Suspense fallback={<ConcertRankingCardSkeleton count={5} />}>
                  <ConcertRankingSection />
                </Suspense>
              </div>
            </section>
          </div>
          <div>
            <p className="text-xl font-medium">나의 뮤지션</p>
            <section className="w-full h-fit py-2 overflow-x-auto">
              <div className="w-full h-full relative flex gap-2">
                {user && <FavoriteMusicianSection />}
              </div>
              {!user && <NeedLogin />}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
