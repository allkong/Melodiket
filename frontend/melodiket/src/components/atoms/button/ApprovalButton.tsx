import clsx from 'clsx';

interface ApprovalButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const ApprovalButton = ({
  label,
  disabled = false,
  onClick,
}: ApprovalButtonProps) => {
  return (
    <button
      className={clsx('w-20 text-lg h-8 rounded-full border', {
        'text-black bg-white border-gray-300': !disabled,
        'text-gray-400 bg-gray-100 border-gray-200': disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ApprovalButton;
