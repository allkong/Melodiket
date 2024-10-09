import FavoriteButton from '@/components/atoms/button/FavoriteButton';
import Profile from '@/components/atoms/profile/Profile';

interface FavoriteProfile {
  src: string;
  size: 'md' | 'lg';
  isFavorite: boolean;
  onClick?: () => void;
}

const FavoriteProfile = ({
  src,
  size,
  isFavorite,
  onClick,
}: FavoriteProfile) => {
  return (
    <div className="relative w-fit">
      <Profile src={src} size={size} />
      <div className="absolute bottom-0 right-0">
        <FavoriteButton size={size} isOn={isFavorite} onClick={onClick} />
      </div>
    </div>
  );
};

export default FavoriteProfile;
