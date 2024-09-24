import clsx from 'clsx';

interface TabButtonProps {
  label: string;
  isSelected?: boolean;
  onClick: () => void;
}

const TabButton = ({ label, isSelected = false, onClick }: TabButtonProps) => {
  return (
    <button
      className={clsx(
        'font-semibold bg-white w-full py-2',
        isSelected
          ? 'text-purple-300 border-b-2 border-purple-300'
          : 'text-gray-400'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
