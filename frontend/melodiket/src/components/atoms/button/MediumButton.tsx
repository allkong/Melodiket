import clsx from 'clsx';

interface MediumButtonProps {
  label: string;
  color?: 'primary' | 'gray';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const MediumButton = ({
  label,
  color = 'primary',
  onClick,
}: MediumButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx('rounded-md w-28 h-10 text-white font-medium', {
        'bg-primary': color === 'primary',
        'bg-gray-300': color === 'gray',
      })}
    >
      {label}
    </button>
  );
};

export default MediumButton;
