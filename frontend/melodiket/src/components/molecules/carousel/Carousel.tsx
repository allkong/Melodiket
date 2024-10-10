'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { getCidUrl } from '@/utils/getUrl';
import useElementSize from '@/hooks/useElementSize';
import useAutoIndex from '@/hooks/useAutoIndex';
import type { CarouselConcert } from '@/types/concert';

import CarouselImage from '@/components/molecules/carousel/CarouselImage';
import CarouselIndicator from '@/components/molecules/carousel/CarouselIndicator';

interface CarouselProps {
  data: CarouselConcert[];
  size?: 'md' | 'lg';
  delay?: number;
  gap?: number;
  rounded?: boolean;
}

const Carousel = ({
  size = 'md',
  data,
  delay = 4000,
  gap = 0,
  rounded = false,
}: CarouselProps) => {
  const [autoIndex, setAutoIndex] = useAutoIndex(0, 0, data.length - 1, delay);
  const handleClickIndicator = (index: number) => {
    setAutoIndex(index);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  const getTranslateValue = (index: number, width: number, gap: number) =>
    -index * (width + gap);

  const [translate, setTranslate] = useState(
    data.map((_, index) => getTranslateValue(index, width, gap))
  );

  useEffect(() => {
    setTranslate(data.map((_, index) => getTranslateValue(index, width, gap)));
  }, [data, width, gap]);

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
          {data.map((concert) => (
            <CarouselImage
              key={getCidUrl(concert.posterCid)}
              size={size}
              data={concert}
              rounded={rounded}
            />
          ))}
        </div>
      </div>
      <CarouselIndicator
        size={data.length}
        currentIndex={autoIndex}
        onClick={handleClickIndicator}
      />
    </div>
  );
};

export default Carousel;
