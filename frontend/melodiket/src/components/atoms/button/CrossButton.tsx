import { Cross } from '@/public/icons';

interface CrossButtonProps {
  onClick?: () => void;
}

const CrossButton = ({ onClick }: CrossButtonProps) => {
  return (
    <button onClick={onClick} className="text-gray-400">
      <Cross className="fill-current" width="17" height="17" />
    </button>
  );
};

export default CrossButton;
