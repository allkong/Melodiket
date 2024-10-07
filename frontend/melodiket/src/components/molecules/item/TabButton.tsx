import clsx from 'clsx';

interface TabButtonProps {
  label: string;
  isSelected?: boolean;
  onClick: () => void;
  line?: boolean;
}

const TabButton = ({
  label,
  isSelected = false,
  onClick,
  line = true,
}: TabButtonProps) => {
  return (
    <button
      className={clsx('font-semibold bg-white w-full py-2', {
        'text-purple-300': isSelected,
        'border-b-2 border-purple-300': isSelected && line,
        'text-gray-400': !isSelected,
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
