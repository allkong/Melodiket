'use client';

import React, { useEffect, useRef } from 'react';

import { useFetchInfiniteConcert } from '@/services/concert/fetchConcert';
import useIsOnScreen from '@/hooks/useIsOnScreen';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import ConcertCardSkeleton from '@/components/molecules/card/ConcertCardSkeleton';
import IsEnd from '@/components/atoms/label/IsEnd';
import IsError from '@/components/atoms/button/IsErrorButton';

const ConcertListSection = () => {
  const { data, isFetching, error, hasNextPage, fetchNextPage, refetch } =
    useFetchInfiniteConcert();
  const { pages } = data ?? {};

  const endRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(endRef);

  useEffect(() => {
    if (isOnScreen && hasNextPage) {
      fetchNextPage();
    }
  }, [isOnScreen, hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="px-3 grid grid-flow-row lg:grid-cols-3 grid-cols-2 w-full place-items-center">
        {pages &&
          pages
            ?.flatMap((page) => page.result)
            .map((concert) => (
              <ConcertCard
                key={`${concert.concertUuid}-${concert.posterCid}`}
                href={`/concerts/${concert.concertUuid}`}
                {...concert}
              />
            ))}
        {isFetching && <ConcertCardSkeleton count={6} />}
      </div>
      {error && <IsError onClick={refetch} />}
      {!hasNextPage && !error && <IsEnd />}
      <div ref={endRef} className="w-full h-3 bg-white" />
    </>
  );
};

export default ConcertListSection;
