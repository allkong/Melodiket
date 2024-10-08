'use client';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import useIsOnScreen from '@/hooks/useIsOnScreen';
import { useFetchInfiniteConcert } from '@/services/concert/fetchConcert';
import { useEffect, useRef } from 'react';
import IsError from '@/components/atoms/button/IsErrorButton';
import IsEnd from '@/components/atoms/label/IsEnd';
import ConcertCardSkeleton from '@/components/molecules/card/ConcertCardSkeleton';

interface ConcertSearchResultProps {
  query: string;
  currentTab: keyof typeof FAVORITE_TYPES;
}

const ConcertSearchResult = ({
  query,
  currentTab,
}: ConcertSearchResultProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(endRef);
  const { data, error, hasNextPage, isFetching, fetchNextPage, refetch } =
    useFetchInfiniteConcert(10, 'uuid', 'ASC', query);

  useEffect(() => {
    if (isOnScreen && currentTab === 'concert' && hasNextPage) {
      fetchNextPage();
    }
  }, [isOnScreen, currentTab, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col flex-shrink-0 h-full w-full overflow-y-auto">
      <div className="w-full grid grid-flow-row grid-cols-2 lg:grid-cols-3 place-items-center">
        {data &&
          data.pages.map((page) =>
            page.result.map((concert) => (
              <ConcertCard
                key={`${concert.concertUuid}-${concert.posterCid}`}
                {...concert}
              />
            ))
          )}
        {isFetching && <ConcertCardSkeleton count={6} />}
      </div>
      <div ref={endRef} className="w-full h-3 bg-white" />
      {error && <IsError onClick={refetch} />}
      {!hasNextPage && <IsEnd />}
    </div>
  );
};

export default ConcertSearchResult;
