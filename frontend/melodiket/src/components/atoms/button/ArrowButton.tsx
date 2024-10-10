import clsx from 'clsx';
import { Arrow } from '@/public/icons';

interface ArrowButtonProps {
  direction?: 'up' | 'down' | 'right' | 'left';
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ArrowButton = ({
  direction = 'right',
  color = 'text-gray-400',
  onClick,
}: ArrowButtonProps) => {
  return (
    <button className="w-3 h-auto">
      <Arrow
        className={clsx(color, {
          'transform rotate-0': direction === 'right',
          'transform rotate-90': direction === 'down',
          'transform -rotate-90': direction === 'up',
          'transform rotate-180': direction === 'left',
        })}
        fill="currentColor"
        onClick={onClick}
      />
    </button>
  );
};

export default ArrowButton;
