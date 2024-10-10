'use client';

import { Suspense } from 'react';

import Header from '@/components/organisms/navigation/Header';
import ConcertRankingSection from './_section/concert-ranking-section';
import FavoriteMusicianSection from './_section/favorite-musician-section';
import CarouselSection from './_section/carousel-section';
import ConcertRankingCardSkeleton from '@/components/molecules/card/ConcertRankingCardSkeleton';
import TicketSection from './_section/ticket-section';
import WebPush from './_components/web-push';
import useAuthStore from '@/store/authStore';
import { User } from '@/types/user';

const getFavoriteMusicianSection = (user: User | null) => {
  if (!user || user.role === 'AUDIENCE') {
    return (
      <div>
        <p className="text-xl font-medium">나의 뮤지션</p>
        <section className="w-full py-2 overflow-x-auto">
          <FavoriteMusicianSection />
        </section>
      </div>
    );
  }
  return null;
};

export default function Home() {
  const { user } = useAuthStore();

  return (
    <>
      <WebPush />
      <div className="w-full min-h-screen overflow-y-auto bg-purple-100">
        <Header isFixed />
        <div className="w-full mt-16 px-7">
          <CarouselSection />
          <div className="flex flex-col gap-6 my-3">
            <TicketSection />
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
            {/* <div>
              <p className="text-xl font-medium">나의 뮤지션</p>
              <section className="w-full py-2 overflow-x-auto">
                <FavoriteMusicianSection />
              </section>
            </div> */}
            {getFavoriteMusicianSection(user)}
          </div>
        </div>
      </div>
    </>
  );
}
