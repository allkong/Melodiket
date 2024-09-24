import Link from 'next/link';
import Image from 'next/image';

import { CalendarFilled, Location, SubwayMark } from '@/public/icons';

interface ConcertRankingCardProps {}

const ConcertRankingCard = ({}: ConcertRankingCardProps) => {
  return (
    <Link
      href="/"
      className="flex flex-col w-[136px] h-[248px] rounded-md bg-white shadow-sm overflow-hidden"
    >
      <div className="relative w-full h-48">
        <Image
          src={
            'https://tkfile.yes24.com/upload2/PerfBlog/202211/20221122/20221122-44221.jpg'
          }
          alt="공연 랭킹 카드 컴포넌트"
          className="object-cover"
          fill
        />
        <div className="absolute top-0 left-3 flex items-center justify-center w-fit h-fit text-primary">
          <SubwayMark className="fill-current" />
          <p className="absolute top-0 text-white font-semibold text-tiny">
            10
          </p>
        </div>
      </div>
      <div className="flex-grow h-0 px-3 py-2">
        <p className="text-xs truncate">The Volunteers 1st Concert</p>
        <div className="text-[8px] text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarFilled width="6" height="8" className="fill-current" />
            <p>2024.09.03</p>
          </div>
          <div className="flex items-center gap-1">
            <Location width="6" height="8" className="fill-current" />
            <p>고척스카이돔</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConcertRankingCard;
