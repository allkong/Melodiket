'use client';

import { useEffect, useRef } from 'react';

import { useMusiciansQuery } from '@/services/musician/fetchMusician';
import { getS3Url } from '@/utils/getUrl';
import useIsOnScreen from '@/hooks/useIsOnScreen';

import MusicianItem from '@/components/molecules/item/MusicianItem';
import MusicianItemSkeleton from '@/components/molecules/item/MusicianItemSkeleton';
import IsEnd from '@/components/atoms/label/IsEnd';
import IsError from '@/components/atoms/button/IsErrorButton';

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
                key={musician.uuid}
                uuid={musician.uuid}
                src={getS3Url(musician.imageUrl)}
                musicianName={musician.nickname}
                initialFavoriteCount={musician.likeCount}
                initialFavorite={musician.isLike}
              />
            ))}
        {isFetching && <MusicianItemSkeleton count={6} />}
      </div>
      {error && <IsError onClick={refetch} />}
      {data && !hasNextPage && <IsEnd />}
      <div ref={endRef} />
    </>
  );
};

export default MusicianListSection;
