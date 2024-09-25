import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import { LogoImage } from '@/public/icons';

interface FavoriteTitleProps {
  type: keyof typeof FAVORITE_TYPES;
  total: number;
}

const FavoriteTitle = ({ type, total }: FavoriteTitleProps) => {
  return (
    <div className="flex items-center px-6 py-3 space-x-4 bg-white">
      <LogoImage className="w-8 h-auto" />
      <div className="flex space-x-3 text-xl font-medium">
        <p>좋아하는 {FAVORITE_TYPES[type]}</p>
        <p className="text-gray-400">{total}</p>
      </div>
    </div>
  );
};

export default FavoriteTitle;
