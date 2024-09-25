'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import type { CarouselConcert } from '@/types/concert';
import CarouselImage from '@/components/molecules/carousel/CarouselImage';
import CarouselIndicator from '@/components/molecules/carousel/CarouselIndicator';
import useElementSize from '@/hooks/useElementSize';
import useAutoIndex from '@/hooks/useAutoIndex';

interface CarouselProps {
  datas: CarouselConcert[];
  size?: 'md' | 'lg';
  delay?: number;
  gap?: number;
}

const Carousel = ({
  size = 'md',
  datas,
  delay = 4000,
  gap = 0,
}: CarouselProps) => {
  const [autoIndex, setAutoIndex] = useAutoIndex(0, 0, datas.length - 1, delay);
  const handleClickIndicator = (index: number) => {
    setAutoIndex(index);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  const getTranslateValue = (index: number, width: number, gap: number) =>
    -index * (width + gap);

  const [translate, setTranslate] = useState(
    datas.map((_, index) => getTranslateValue(index, width, gap))
  );

  useEffect(() => {
    setTranslate(datas.map((_, index) => getTranslateValue(index, width, gap)));
  }, [width, gap]);

  return (
    <div
      className={clsx('relative w-full', {
        'h-[250px]': size === 'md',
        'h-[360px]': size === 'lg',
      })}
    >
      <div className="w-full h-full overflow-hidden" ref={containerRef}>
        <div
          className="w-full h-full flex"
          style={{
            translate: translate[autoIndex],
            transitionDuration: '400ms',
            transitionTimingFunction: 'ease-in-out',
            columnGap: gap,
          }}
        >
          {datas.map((data) => (
            <CarouselImage key={data.index} size={size} data={data} />
          ))}
        </div>
      </div>
      <CarouselIndicator
        size={datas.length}
        currentIndex={autoIndex}
        onClick={handleClickIndicator}
      />
    </div>
  );
};

export default Carousel;
