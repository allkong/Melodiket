'use client';

import { useEffect, useRef } from 'react';
import { useConcertsByMusician } from '@/services/musician/fetchMusician';

import useIsOnScreen from '@/hooks/useIsOnScreen';

import IsErrorButton from '@/components/atoms/button/IsErrorButton';
import IsEnd from '@/components/atoms/label/IsEnd';
import ConcertCard from '@/components/molecules/card/ConcertCard';
import ConcertCardSkeleton from '@/components/molecules/card/ConcertCardSkeleton';

interface MusicianConcertSectionProps {
  uuid: string;
}

const MusicianConcertSection = ({ uuid }: MusicianConcertSectionProps) => {
  const { data, isFetching, error, hasNextPage, fetchNextPage, refetch } =
    useConcertsByMusician(uuid);
  const { pages } = data ?? {};
  console.log(pages);

  const endRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(endRef);

  useEffect(() => {
    if (isOnScreen && hasNextPage) {
      fetchNextPage();
    }
  }, [isOnScreen, hasNextPage, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="px-3 grid grid-flow-row lg:grid-cols-3 grid-cols-2 w-full place-items-center">
        {pages &&
          pages
            ?.flatMap((page) => page.result)
            .map((concert) => (
              <ConcertCard
                key={concert.concertUuid}
                href={`/concerts/${concert.concertUuid}`}
                isFavorite={concert?.isLike}
                {...concert}
                onClickFavorite={refetch}
              />
            ))}
        {isFetching && <ConcertCardSkeleton count={6} />}
      </div>
      {error && <IsErrorButton onClick={refetch} />}
      {!hasNextPage && !error && <IsEnd />}
      <div ref={endRef} className="w-full h-3 bg-white" />
    </>
  );
};

export default MusicianConcertSection;
