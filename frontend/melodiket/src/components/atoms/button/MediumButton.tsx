import clsx from 'clsx';

interface MediumButtonProps {
  label: string;
  color?: 'primary' | 'gray';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactElement;
}

const MediumButton = ({
  label,
  color = 'primary',
  onClick,
  icon,
}: MediumButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-md min-w-28 h-10 text-white font-medium flex items-center justify-center px-4',
        {
          'bg-primary': color === 'primary',
          'bg-gray-300': color === 'gray',
        }
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && (
          <div className="flex items-center justify-center w-5 h-auto">
            {icon}
          </div>
        )}
        <p>{label}</p>
      </div>
    </button>
  );
};

export default MediumButton;
