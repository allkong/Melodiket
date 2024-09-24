import { Heart } from '@/public/icons';
import clsx from 'clsx';

interface FavoriteButtonProps {
  isOn?: boolean;
  size?: 'md' | 'lg';
  onClick?: () => void;
}

const FavoriteButton = ({
  isOn = false,
  size = 'md',
  onClick,
}: FavoriteButtonProps) => {
  return (
    <div>
      <Heart
        className={clsx({
          'text-primary': isOn,
          'text-gray-300': !isOn,
          'w-7': size == 'md',
          'w-10': size == 'lg',
        })}
        fill="currentColor"
        onClick={onClick}
      />
    </div>
  );
};

export default FavoriteButton;
