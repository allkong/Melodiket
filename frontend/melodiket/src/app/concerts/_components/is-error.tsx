import MediumButton from '@/components/atoms/button/MediumButton';

interface IsErrorProps {
  onClick?: () => void;
}

const IsError = ({ onClick }: IsErrorProps) => {
  return (
    <div className="w-full py-3 flex flex-col gap-3 items-center justify-center">
      <p className="text-sm font-semibold">에러가 발생했습니다.</p>
      <MediumButton label="다시 시도" onClick={() => onClick?.()} />
    </div>
  );
};

export default IsError;
