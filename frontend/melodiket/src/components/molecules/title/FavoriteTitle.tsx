import { FAVORITE_TYPE } from '@/constants/favoriteType';
import { LogoImage } from '@/public/icons';

interface FavoriteTitleProps {
  type: keyof typeof FAVORITE_TYPE;
  total: number;
}

const FavoriteTitle = ({ type, total }: FavoriteTitleProps) => {
  return (
    <div className="flex items-center px-6 py-3 space-x-4 bg-white">
      <LogoImage width={30} />
      <div className="flex space-x-3 text-xl font-medium">
        <p>좋아하는 {FAVORITE_TYPE[type]}</p>
        <p className="text-gray-400">{total}</p>
      </div>
    </div>
  );
};

export default FavoriteTitle;
