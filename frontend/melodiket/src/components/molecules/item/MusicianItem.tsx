import FavoriteButton from '@/components/atoms/button/FavoriteButton';
import Profile from '@/components/atoms/profile/Profile';
import Link from 'next/link';

interface MusicianItemProps {
  href: string;
  src: string;
  musicianName: string;
  favoriteCount: number;
  bookingCount: number;
  isFavorite?: boolean;
}

const MusicianItem = ({
  href,
  src,
  musicianName,
  favoriteCount,
  isFavorite = false,
}: MusicianItemProps) => {
  return (
    <Link href={href || '/'}>
      <div className="flex flex-row items-center justify-between px-6 py-5 bg-white border-b border-purple-50">
        <div className="flex flex-row items-center space-x-4">
          <Profile src={src} size="sm" />
          <div className="flex space-x-3">
            <p className="font-medium">{musicianName}</p>
            <span className="text-primary">{favoriteCount}</span>
          </div>
        </div>
        <FavoriteButton isOn={isFavorite} />
      </div>
    </Link>
  );
};

export default MusicianItem;
