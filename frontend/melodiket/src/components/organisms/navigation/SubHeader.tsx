import ArrowButton from '@/components/atoms/button/ArrowButton';
import CloseButton from '@/components/atoms/button/CloseButton';
import { useRouter } from 'next/navigation';

interface SubHeaderProps {
  title: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  canGoBack?: boolean;
}

const SubHeader = ({ title, onClose, canGoBack = false }: SubHeaderProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 bg-white">
      <div className="w-3">
        {canGoBack && <ArrowButton direction="left" onClick={handleGoBack} />}
      </div>
      <h1>{title}</h1>
      <CloseButton onClick={onClose} />
    </header>
  );
};

export default SubHeader;
