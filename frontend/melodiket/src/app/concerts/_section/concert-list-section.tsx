'use client';

import React, { useEffect, useRef } from 'react';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import ConcertCardSkeleton from '@/components/molecules/card/ConcertCardSkeleton';
import useIsOnScreen from '@/hooks/useIsOnScreen';
import IsEnd from '../_components/is-end';
import IsError from '../_components/is-error';
import { useFetchInfiniteConcert } from '@/services/concert/fetchConcert';

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
                {...concert}
              />
            ))}
        {isFetching && <ConcertCardSkeleton count={6} />}
      </div>
      {error && <IsError onClick={refetch} />}
      {!hasNextPage && <IsEnd />}
      <div ref={endRef} className="w-full h-3 bg-white" />
    </>
  );
};

export default ConcertListSection;
