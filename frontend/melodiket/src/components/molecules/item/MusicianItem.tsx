import FavoriteButton from '@/components/atoms/button/FavoriteButton';
import Profile from '@/components/atoms/profile/Profile';

interface MusicianItemProps {
  src: string;
  musicianName: string;
  favoriteCount: number;
  bookingCount: number;
  isFavorite?: boolean;
}

const MusicianItem = ({
  src,
  musicianName,
  favoriteCount,
  bookingCount,
  isFavorite = false,
}: MusicianItemProps) => {
  return (
    <div className="flex flex-row items-center justify-between px-6 py-5 bg-white border-b border-purple-50">
      <div className="flex flex-row items-center space-x-4">
        <Profile src={src} />
        <div className="space-y-1">
          <p className="font-medium">{musicianName}</p>
          <div className="flex flex-row space-x-2.5">
            <p>
              찜 <span className="text-primary">{favoriteCount}</span>
            </p>
            <p>|</p>
            <p>
              예매중 <span className="text-primary">{bookingCount}</span>
            </p>
          </div>
        </div>
      </div>
      <FavoriteButton isOn={isFavorite} />
    </div>
  );
};

export default MusicianItem;
