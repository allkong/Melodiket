import Image from 'next/image';
import Link from 'next/link';

import FavoriteButton from '@/components/atoms/button/FavoriteButton';
import { CalendarFilled, Location } from '@/public/icons';

interface ConcertCardProps {
  concertId: string;
  href?: string;
  musicians?: string[];
  ticketingAt?: string;
  stage?: string;
  posterURL?: string;
  isFavorite?: boolean;
  onClickFavorite?: (id: string) => void;
}

const ConcertCard = ({
  concertId,
  href,
  musicians,
  ticketingAt,
  stage,
  posterURL,
  isFavorite,
  onClickFavorite,
}: ConcertCardProps) => {
  return (
    <Link href={href ?? '/'}>
      <div className="w-44 p-1 bg-white flex flex-col space-y-2">
        {/* 이미지 영역 */}
        <div className="relative w-[10.6rem] h-60">
          <Image
            src={posterURL ?? ''}
            alt="concert card image"
            className="object-cover rounded-md"
            fill
          />
          <div className="absolute right-2 bottom-2">
            <FavoriteButton
              isOn={isFavorite}
              onClick={() => onClickFavorite?.(concertId)}
            />
          </div>
        </div>
        {/* 컨텐츠 영역 */}
        <div>
          <p className="text-xs font-medium truncate mb-1">
            {musicians && musicians.join(' ')}
          </p>
          <div className="flex items-center gap-1 text-[8px] text-gray-500">
            <CalendarFilled width="6" height="8" className="fill-current" />
            {ticketingAt && <p>{ticketingAt}</p>}
          </div>
          <div className="flex items-center gap-1 text-[8px] text-gray-500 truncate">
            <Location width="6" height="8" className="fill-current" />
            {stage && <p>{stage}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConcertCard;
