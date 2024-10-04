'use client';

import Image from 'next/image';
import Link from 'next/link';

import FavoriteButton from '@/components/atoms/button/FavoriteButton';
import { CalendarFilled, Location } from '@/public/icons';
import type { Concert } from '@/types/concert';

interface ConcertCardProps
  extends Pick<
    Concert,
    'concertUuid' | 'posterCid' | 'title' | 'location' | 'ticketingAt'
  > {
  href?: string;
  isFavorite?: boolean;
  onClickFavorite?: (id: string) => void;
}

const ConcertCard = ({
  concertUuid,
  posterCid,
  ticketingAt,
  title,
  location,
  href,
  isFavorite,
  onClickFavorite,
}: ConcertCardProps) => {
  return (
    <Link href={href ?? '/'}>
      <div className="w-44 p-1 flex flex-col space-y-2">
        {/* 이미지 영역 */}
        <div className="relative w-[10.6rem] h-60">
          <Image
            src={posterCid ?? ''}
            alt="concert card image"
            className="object-cover rounded-md"
            fill
          />
          <div className="absolute right-2 bottom-2">
            <FavoriteButton
              isOn={isFavorite}
              onClick={() => onClickFavorite?.(concertUuid)}
            />
          </div>
        </div>
        {/* 컨텐츠 영역 */}
        <div>
          {title && (
            <p className="text-xs font-medium truncate mb-1">{title}</p>
          )}
          <div className="flex items-center gap-1 text-[8px] text-gray-500">
            <CalendarFilled width="6" height="8" className="fill-current" />
            {ticketingAt && <p>{ticketingAt}</p>}
          </div>
          <div className="flex items-center gap-1 text-[8px] text-gray-500 truncate">
            <Location width="6" height="8" className="fill-current" />
            {location && <p>{location}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConcertCard;
