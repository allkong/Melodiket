import { ArrowsRotate } from '@/public/icons';

interface RotateButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const RotateButton = ({ onClick }: RotateButton) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 bg-black rounded-full bg-opacity-60"
    >
      <ArrowsRotate />
    </button>
  );
};

export default RotateButton;
