'use client';

import useAutoIndex from '@/hooks/useAutoIndex';
import { RoundQueueMusic } from '@/public/icons';

interface TicketInfoCarouselProps {
  datas: string[];
}

const TicketInfoCarousel = ({ datas }: TicketInfoCarouselProps) => {
  const [autoIndex] = useAutoIndex(0, 0, datas.length - 1, 4000);

  return (
    <div className="flex gap-2 items-center w-full h-[30px] rounded-lg px-[10px] py-1 text-white bg-gradient-to-r from-secondary to-primary">
      <RoundQueueMusic className="fill-current" />
      <div className="w-full h-full overflow-hidden">
        <div
          className="flex flex-col"
          style={{
            transform: `translateY(-${21 * autoIndex}px)`,
            transitionDuration: `1000ms`,
            transitionTimingFunction: 'linear',
          }}
        >
          {datas.map((data, index) => (
            <p key={index} className="text-current text-sm truncate">
              {data}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketInfoCarousel;
