import { HydrationBoundary } from '@tanstack/react-query';
import {
  useFetchCarouselListDehydrateState,
  useFetchConcertListDehydrateState,
} from '@/services/concert/fetchConcert';
import { Suspense } from 'react';

import Header from '@/components/organisms/navigation/Header';
import TicketInfoCarousel from '@/components/molecules/carousel/TicketInfoCarousel';
import ConcertRankingSection from './_components/concert-ranking-section';
import FavoriteMusicianSection from './_components/favorite-musician-section';

import Skeleton from '@/components/atoms/skeleton/Skeleton';
import CarouselSection from './_components/carousel-section';
import { useFetchFavoriteMusiciansListDehydrateState } from '@/services/favorite/fetchFavoriteMusiciansList';

export default async function Home() {
  return (
    <div className="w-full min-h-screen overflow-y-auto bg-purple-100">
      <Header isFixed />
      <div className="w-full mt-16 px-7">
        <HydrationBoundary state={await useFetchCarouselListDehydrateState()}>
          <CarouselSection />
        </HydrationBoundary>
        <div className="flex flex-col gap-6 my-3">
          <TicketInfoCarousel
            datas={['예매한 티켓이 없어요 T_T', '사실 잇지롱', 'A310 화이팅~']}
          />
          <div>
            <p className="text-xl font-medium">공연 랭킹</p>
            <section className="w-full py-2 overflow-x-auto">
              <div className="flex gap-2">
                <HydrationBoundary
                  state={await useFetchConcertListDehydrateState()}
                >
                  <ConcertRankingSection />
                </HydrationBoundary>
              </div>
            </section>
          </div>
          <div>
            <p className="text-xl font-medium">나의 뮤지션</p>
            <section className="w-full py-2 overflow-x-auto">
              <div className="flex gap-2">
                <HydrationBoundary
                  state={useFetchFavoriteMusiciansListDehydrateState()}
                >
                  <Suspense
                    fallback={<Skeleton width={112} height={147} count={5} />}
                  >
                    <FavoriteMusicianSection />
                  </Suspense>
                </HydrationBoundary>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
