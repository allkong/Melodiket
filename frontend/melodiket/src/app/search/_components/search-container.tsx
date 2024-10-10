'use client';

import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import { ReactNode, useRef } from 'react';
import useElementSize from '@/hooks/useElementSize';

interface SearchContainerProps {
  currentTab: keyof typeof FAVORITE_TYPES;
  children: ReactNode;
  isVisible: boolean;
}

const SearchContainer = ({
  currentTab,
  children,
  isVisible,
}: SearchContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  return (
    <div
      className="w-full overflow-hidden"
      style={{ height: `${isVisible ? '100%' : '0px'}` }}
    >
      <div
        ref={containerRef}
        className="flex min-w-full h-full"
        style={{
          transform: `translateX(${currentTab === 'concert' ? 0 : -width}px)`,
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SearchContainer;
