'use client';

import { useEffect, useRef } from 'react';

import { useMusiciansQuery } from '@/services/musician/fetchMusicians';
import { getS3Url } from '@/utils/getUrl';
import useIsOnScreen from '@/hooks/useIsOnScreen';

import MusicianItem from '@/components/molecules/item/MusicianItem';
import MusicianItemSkeleton from '@/components/molecules/item/MusicianItemSkeleton';
import IsEnd from '@/app/concerts/_components/is-end';
import IsError from '@/app/concerts/_components/is-error';

const MusicianListSection = () => {
  const { data, isFetching, error, hasNextPage, fetchNextPage, refetch } =
    useMusiciansQuery();
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
      <div>
        {pages &&
          pages
            ?.flatMap((page) => page.result)
            .map((musician) => (
              <MusicianItem
                href={`/musicians/${musician.uuid}`}
                key={musician.uuid}
                src={getS3Url(musician.imageUrl)}
                musicianName={musician.nickname}
                favoriteCount={musician.likeCount}
                bookingCount={2}
                isFavorite
              />
            ))}
        {isFetching && <MusicianItemSkeleton count={5} />}
      </div>
      {error && <IsError onClick={refetch} />}
      {!hasNextPage && <IsEnd />}
      <div ref={endRef} />
    </>
  );
};

export default MusicianListSection;
