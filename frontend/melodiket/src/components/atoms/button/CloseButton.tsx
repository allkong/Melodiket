import clsx from 'clsx';
import { Cross } from '@/public/icons';

interface ClosebuttonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  hasBorder?: boolean;
}

const CloseButton = ({ onClick, hasBorder = false }: ClosebuttonProps) => {
  return (
    <button onClick={onClick}>
      <div
        className={clsx({
          'border border-gray-200 rounded-full h-11 w-11 flex items-center justify-center':
            hasBorder,
        })}
      >
        <Cross />
      </div>
    </button>
  );
};

export default CloseButton;
