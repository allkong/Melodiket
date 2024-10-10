'use client';

import useAutoIndex from '@/hooks/useAutoIndex';
import { RoundQueueMusic } from '@/public/icons';

interface TicketInfoCarouselProps {
  data: string[];
}

const TicketInfoCarousel = ({ data }: TicketInfoCarouselProps) => {
  const [autoIndex] = useAutoIndex(0, 0, data.length - 1, 4000);

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
          {data.map((text, index) => (
            <p key={index} className="text-current text-sm truncate">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketInfoCarousel;
