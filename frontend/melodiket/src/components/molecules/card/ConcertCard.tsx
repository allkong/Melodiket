import Image from 'next/image';
import Link from 'next/link';

import FavoriteButton from '@/components/atoms/button/FavoriteButton';

interface ConcertCardProps {
  href: string;
}

const ConcertCard = ({}: ConcertCardProps) => {
  return (
    <Link href="/">
      <div className="w-44 p-1 bg-pink-400 flex flex-col">
        {/* 이미지 영역 */}
        <div className="relative w-[10.6rem] h-60">
          <Image
            src=""
            alt="concert card image"
            className="object-cover rounded-md"
            fill
          />
          <div className="absolute right-2 bottom-2">
            <FavoriteButton />
          </div>
        </div>
        {/* 컨텐츠 영역 */}
        <div>
          <p>킹누</p>
          <p>2024.09.03</p>
          <p>고척스카이돔</p>
        </div>
      </div>
    </Link>
  );
};

export default ConcertCard;
