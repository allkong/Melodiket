import Link from 'next/link';
import Image from 'next/image';

import { CalendarFilled, Location, SubwayMark } from '@/public/icons';
import type { Concert } from '@/types/concert';

interface ConcertRankingCardProps
  extends Pick<
    Concert,
    'concertUuid' | 'posterCid' | 'title' | 'location' | 'ticketingAt'
  > {
  ranking: number;
  href?: string;
}

const ConcertRankingCard = ({
  ranking,
  href,
  title,
  location,
  posterCid,
  ticketingAt,
}: ConcertRankingCardProps) => {
  return (
    <Link
      href={href || '/'}
      className="flex flex-col flex-shrink-0 w-[136px] h-[248px] rounded-md bg-white shadow-[1px_1px_10px_rgba(143,0,255,0.2)] overflow-hidden"
    >
      <div className="relative w-full h-48">
        <Image
          src={posterCid}
          alt="공연 랭킹 카드 컴포넌트"
          className="object-cover"
          fill
        />
        <div className="absolute top-0 left-1 flex items-center justify-center w-fit h-fit text-primary">
          <SubwayMark className="fill-current" />
          <p className="absolute top-0 text-white font-semibold text-tiny">
            {ranking}
          </p>
        </div>
      </div>
      <div className="flex-grow h-0 px-3 py-2">
        <p className="text-xs truncate">{title}</p>
        <div className="text-[8px] text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarFilled width="6" height="8" className="fill-current" />
            <p>{ticketingAt}</p>
          </div>
          <div className="flex items-center gap-1">
            <Location width="6" height="8" className="fill-current" />
            <p>{location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConcertRankingCard;
