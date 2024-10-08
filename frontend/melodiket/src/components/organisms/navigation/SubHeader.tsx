import ArrowButton from '@/components/atoms/button/ArrowButton';
import CloseButton from '@/components/atoms/button/CloseButton';
import { useRouter } from 'next/navigation';

interface SubHeaderProps {
  title: string;
  onPrev?: React.MouseEventHandler<HTMLButtonElement>;
  canGoPrev?: boolean;
}

const SubHeader = ({ title, onPrev, canGoPrev = false }: SubHeaderProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 bg-white">
      <div className="w-3">
        {canGoPrev && <ArrowButton direction="left" onClick={onPrev} />}
      </div>
      <h1>{title}</h1>
      <CloseButton onClick={handleGoBack} />
    </header>
  );
};

export default SubHeader;
