import Image from 'next/image';

import clsx from 'clsx';

import { Location, CalendarFilled } from '@/public/icons';
import type { CarouselConcert } from '@/types/concert';

interface CarouselImageProps {
  size?: 'md' | 'lg';
  data: CarouselConcert;
}

const CarouselImage = ({ size = 'md', data }: CarouselImageProps) => {
  return (
    <div
      className={clsx('relative w-full flex-shrink-0', {
        'h-[250px]': size === 'md',
        'h-[360px]': size === 'lg',
      })}
    >
      <Image
        src={data.posterURL}
        alt="carousel 이미지"
        className="object-cover"
        fill
      />
      <div
        className={clsx(
          'absolute w-full top-0 bottom-0 left-0 right-0 bg-[radial-gradient(circle_at_50%_75%,rgba(0,0,0,0.2),black)] opacity-90',
          {
            'h-[250px]': size === 'md',
            'h-[360px]': size === 'lg',
          }
        )}
      ></div>
      <div className="absolute flex flex-col bottom-3 left-3 text-white">
        <p className="text-2xl mb-2 font-bold whitespace-pre-wrap leading-tight">
          {data.description}
        </p>
        <div className="flex items-center gap-1">
          <CalendarFilled width="8" height="10" className="fill-current" />
          <p className="text-sm">{data.ticketingAt}</p>
        </div>
        <div className="flex items-center gap-1">
          <Location width="8" height="10" className="fill-current" />
          <p className="text-sm">{data.location}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselImage;
