'use client';

import IsErrorButton from '@/components/atoms/button/IsErrorButton';
import IsEnd from '@/components/atoms/label/IsEnd';
import MusicianItem from '@/components/molecules/item/MusicianItem';
import MusicianItemSkeleton from '@/components/molecules/item/MusicianItemSkeleton';
import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import useIsOnScreen from '@/hooks/useIsOnScreen';
import { useMusiciansQuery } from '@/services/musician/fetchMusicians';
import { useEffect, useRef } from 'react';

interface MusicianSearchResultProps {
  query: string;
  currentTab: keyof typeof FAVORITE_TYPES;
}

const MusicianSearchResult = ({ currentTab }: MusicianSearchResultProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(endRef);
  const { data, error, isFetching, hasNextPage, refetch, fetchNextPage } =
    useMusiciansQuery();

  const { pages } = data ?? {};

  useEffect(() => {
    if (isOnScreen && currentTab === 'musician' && hasNextPage) {
      fetchNextPage();
    }
  }, [isOnScreen, currentTab, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col flex-shrink-0 h-full w-full overflow-y-auto">
      <div className="flex flex-col gap-2 w-full">
        {pages &&
          pages?.map((page) =>
            page.result.map((musician) => (
              <MusicianItem
                key={musician.uuid}
                src={'/' + musician.imageUrl}
                bookingCount={-999}
                favoriteCount={musician.likeCount}
                musicianName={musician.nickname}
              />
            ))
          )}
        {isFetching && <MusicianItemSkeleton count={6} />}
        {!hasNextPage && <IsEnd />}
        {error && <IsErrorButton onClick={refetch} />}
      </div>
      <div ref={endRef} className="w-full h-3 bg-white" />
    </div>
  );
};

export default MusicianSearchResult;
