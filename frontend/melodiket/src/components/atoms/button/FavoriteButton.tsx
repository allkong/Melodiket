import { Heart } from '@/public/icons';
import clsx from 'clsx';

interface FavoriteButtonProps {
  isOn?: boolean;
  onClick?: () => void;
}

const FavoriteButton = ({ isOn = false, onClick }: FavoriteButtonProps) => {
  return (
    <div>
      {/* 사이즈 조정 필요함 */}
      <Heart
        className={clsx('w-7', isOn ? 'text-primary' : 'text-gray-300')}
        fill="currentColor"
        onClick={onClick}
      />
    </div>
  );
};

export default FavoriteButton;
