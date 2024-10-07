import Image from 'next/image';

import PhotocardFrame from '@/components/organisms/photocard/PhotocardFrame';

interface PhotocardEditSelectionProps {
  src: string;
  onNext: () => void;
}

const PhotocardEditSelection = ({
  src,
  onNext,
}: PhotocardEditSelectionProps) => {
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

export default PhotocardEditSelection;
