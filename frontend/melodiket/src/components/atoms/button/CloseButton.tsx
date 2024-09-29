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
          'p-2.5 border-2 border-gray-200 rounded-full': hasBorder,
        })}
      >
        <Cross />
      </div>
    </button>
  );
};

export default CloseButton;
