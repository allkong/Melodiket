import PhotocardFrame from '@/components/organisms/photocard/PhotocardFrame';
import Image from 'next/image';

interface PhotocardDecorateSelectionProps {
  src: string;
  onNext: () => void;
}

const PhotocardDecorateSelection = ({
  src,
  onNext,
}: PhotocardDecorateSelectionProps) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <PhotocardFrame>
        <Image
          src={src}
          alt="photocard"
          fill
          draggable={false}
          onContextMenu={handleContextMenu}
        />
      </PhotocardFrame>
    </div>
  );
};

export default PhotocardDecorateSelection;
