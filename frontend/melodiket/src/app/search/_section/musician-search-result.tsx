'use client';

import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import useIsOnScreen from '@/hooks/useIsOnScreen';
import { useEffect, useRef } from 'react';

interface MusicianSearchResultProps {
  query: string;
  currentTab: keyof typeof FAVORITE_TYPES;
}

const MusicianSearchResult = ({}: MusicianSearchResultProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(endRef);

  useEffect(() => {
    if (isOnScreen) {
    }
  }, [isOnScreen]);

  return (
    <div className="flex flex-col flex-shrink-0 h-full w-full overflow-y-auto">
      <div className="flex flex-col gap-2 w-full"></div>
      <div ref={endRef} className="w-full h-3 bg-white" />
    </div>
  );
};

export default MusicianSearchResult;
