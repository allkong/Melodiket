import { ArrowsRotate } from '@/public/icons';

interface RotateButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const RotateButton = ({ onClick }: RotateButton) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-black rounded-full w-11 h-11 opacity-60"
    >
      <ArrowsRotate />
    </button>
  );
};

export default RotateButton;
