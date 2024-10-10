'use client';

import TicketItem from '@/components/molecules/item/TicketItem';
import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import useIsOnScreen from '@/hooks/useIsOnScreen';
import { useFetchInfiniteConcert } from '@/services/concert/fetchConcert';
import { useEffect, useRef } from 'react';
import IsError from '@/components/atoms/button/IsErrorButton';
import IsEnd from '@/components/atoms/label/IsEnd';
import TicketItemSkeleton from '@/components/molecules/item/TicketItemSkeleton';
import { getCidUrl } from '@/utils/getUrl';

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
    useFetchInfiniteConcert({
      pageSize: 10,
      orderDirection: 'ASC',
      orderKey: 'createdAt',
      title: query,
    });

  useEffect(() => {
    if (isOnScreen && currentTab === 'concert' && hasNextPage) {
      fetchNextPage();
    }
  }, [isOnScreen, currentTab, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col flex-shrink-0 h-full w-full overflow-y-auto">
      <div className="flex flex-col gap-2 w-full">
        {data &&
          data.pages.map((page) =>
            page.result.map((concert) => (
              <TicketItem
                key={concert.concertUuid}
                concertTitle={concert.title}
                stageName={concert.stageName}
                src={getCidUrl(concert.posterCid)}
                startAt={concert.startAt}
              />
            ))
          )}
        {isFetching && <TicketItemSkeleton count={6} />}
      </div>
      <div ref={endRef} className="w-full h-3 bg-white" />
      {error && <IsError onClick={refetch} />}
      {!hasNextPage && <IsEnd />}
    </div>
  );
};

export default ConcertSearchResult;
