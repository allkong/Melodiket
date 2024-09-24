'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import type { Concert } from '@/types/concert';
import CarouselImage from '@/components/molecules/carousel/CarouselImage';
import CarouselIndicator from '@/components/molecules/carousel/CarouselIndicator';
import useElementSize from '@/hooks/useElementSize';

interface CarouselProps {
  datas: Concert[];
  size?: 'md' | 'lg';
}

const IMAGE_GAP = 4;

// 여러개의 값을 받아 렌더링 하고, DOM 요소의 크기를 계산하기 때문에 이후에 최적화를 진행해줘도 좋을 것 같다.
const Carousel = ({ size = 'md', datas }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  const getTranslate = (index: number, width: number) =>
    -index * (width + IMAGE_GAP);

  const [translate, setTranslate] = useState(
    datas.map((_, index) => getTranslate(index, width))
  );

  const handleClickIndicator = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === datas.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, datas.length]);

  useEffect(() => {
    setTranslate(datas.map((_, index) => getTranslate(index, width)));
  }, [width]);

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
            translate: translate[currentIndex],
            transitionDuration: '400ms',
            transitionTimingFunction: 'ease-in-out',
            columnGap: IMAGE_GAP,
          }}
        >
          {datas.map((data) => (
            <CarouselImage key={data.index} size={size} image={data.image} />
          ))}
        </div>
      </div>
      <CarouselIndicator
        size={datas.length}
        currentIndex={currentIndex}
        onClick={handleClickIndicator}
      />
    </div>
  );
};

export default Carousel;
