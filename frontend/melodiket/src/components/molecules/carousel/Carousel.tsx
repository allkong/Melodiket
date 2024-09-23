import clsx from 'clsx';
import type { ConcertData } from '@/types/concert';
import { ReactElement } from 'react';

// 최상위 Carousel에서만 datas와 size를 받는다.
// CarouselImage는 ContextAPI를 통해 size props를 받는다.
// 컴포넌트마다 Context API를 따로 설정하려면?
interface CarouselProps {
  datas: ConcertData[];
  size?: 'md' | 'lg';
  children?: ReactElement[];
}

const Carousel = ({ size = 'md', children }: CarouselProps) => {
  return (
    <div
      className={clsx('relative w-full', {
        'h-[250px]': size === 'md',
        'h-[360px]': size === 'lg',
      })}
    >
      {children}
    </div>
  );
};

export default Carousel;
