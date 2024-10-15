'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { useFetchInfiniteConcert } from '@/services/concert/fetchConcert';
import useIsOnScreen from '@/hooks/useIsOnScreen';
import dayjs, { formatDateToYMDHM } from '@/utils/dayjsPlugin';
import { SORT_OPTIONS } from '@/constants/controlOptions';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import ConcertCardSkeleton from '@/components/molecules/card/ConcertCardSkeleton';
import IsEnd from '@/components/atoms/label/IsEnd';
import IsError from '@/components/atoms/button/IsErrorButton';

interface ConcertListSectionProps {}

const ConcertListSection = ({}: ConcertListSectionProps) => {
  const searchParams = useSearchParams();
  const isNowBooking = (searchParams.get('filter') ?? 'true') === 'true';
  const currentSort = (searchParams.get('sort') ??
    'popularity') as keyof typeof SORT_OPTIONS;

  const { data, isFetching, error, hasNextPage, fetchNextPage, refetch } =
    useFetchInfiniteConcert({ isNowBooking, currentSort });
  const { pages } = data ?? {};

  const endRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(endRef);
  const now = dayjs();

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
            .filter((concert) =>
              isNowBooking ? dayjs(concert.startAt).isAfter(now) : true
            )
            .map((concert) => (
              <ConcertCard
                key={concert.concertUuid}
                href={`/concerts/${concert.concertUuid}`}
                isFavorite={concert?.isLike}
                {...concert}
                ticketingAt={formatDateToYMDHM(concert.startAt)}
                onClickFavorite={refetch}
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
