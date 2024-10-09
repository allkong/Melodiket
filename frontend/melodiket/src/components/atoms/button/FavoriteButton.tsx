import { Heart } from '@/public/icons';
import clsx from 'clsx';

interface FavoriteButtonProps {
  isOn?: boolean;
  size?: 'md' | 'lg';
  onClick?: (e: MouseEvent) => void;
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
          'w-7 h-auto': size == 'md',
          'w-10 h-auto': size == 'lg',
        })}
        fill="currentColor"
        onClick={onClick}
      />
    </div>
  );
};

export default FavoriteButton;
