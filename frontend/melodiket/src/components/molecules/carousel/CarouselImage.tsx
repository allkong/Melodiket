import Image from 'next/image';

import clsx from 'clsx';

import { Location, CalendarFilled } from '@/public/icons';
import type { CarouselConcert } from '@/types/concert';

interface CarouselImageProps {
  size?: 'md' | 'lg';
  data: CarouselConcert;
  rounded?: boolean;
}

const CarouselImage = ({
  data,
  size = 'md',
  rounded = false,
}: CarouselImageProps) => {
  return (
    <div
      className={clsx('relative w-full flex-shrink-0', {
        'h-[250px]': size === 'md',
        'h-[360px]': size === 'lg',
      })}
    >
      <Image
        src={data.posterCid}
        alt="carousel 이미지"
        className={clsx('object-cover', {
          'rounded-lg': rounded,
        })}
        fill
      />
      <div
        className={clsx(
          'absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-[radial-gradient(circle_at_50%_75%,rgba(0,0,0,0.2),black)] opacity-90',
          { 'rounded-lg': rounded }
        )}
      ></div>
      <div className="absolute flex flex-col bottom-3 left-3 text-white">
        {data.title !== '' && (
          <p className="text-2xl mb-2 font-bold whitespace-pre-wrap leading-tight">
            {data.title}
          </p>
        )}
        {data.description !== '' && (
          <p className="text-lg mb-2 font-medium whitespace-pre-wrap leading-tight">
            {data.description}
          </p>
        )}
        {data.ticketingAt !== '' && (
          <div className="flex items-center gap-1">
            <CalendarFilled width="8" height="10" className="fill-current" />
            <p className="text-sm">{data.ticketingAt}</p>
          </div>
        )}
        {data.stageName !== '' && (
          <div className="flex items-center gap-1">
            <Location width="8" height="10" className="fill-current" />
            <p className="text-sm">{data.stageName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselImage;
