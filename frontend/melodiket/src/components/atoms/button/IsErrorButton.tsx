import MediumButton from '@/components/atoms/button/MediumButton';

interface IsErrorButtonProps {
  onClick?: () => void;
}

const IsErrorButton = ({ onClick }: IsErrorButtonProps) => {
  return (
    <div className="w-full py-3 flex flex-col gap-3 items-center justify-center">
      <p className="text-sm font-medium text-gray-500">에러가 발생했습니다.</p>
      <MediumButton label="다시 시도" onClick={() => onClick?.()} />
    </div>
  );
};

export default IsErrorButton;
