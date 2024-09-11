import { clsx } from 'clsx';

interface OptionButtonProps {
  label: string;
  isSelected?: boolean;
  //   onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const OptionButton = ({
  label,
  isSelected = false,
  //   onClick,
}: OptionButtonProps) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-full text-sm',
        isSelected
          ? 'text-purple-400 bg-purple-50'
          : 'text-gray-400 bg-gray-100'
      )}
    >
      {label}
    </button>
  );
};

export default OptionButton;
