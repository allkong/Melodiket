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
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <PhotocardFrame>
        <Image src={src} alt="photocard" fill />
      </PhotocardFrame>
    </div>
  );
};

export default PhotocardDecorateSelection;
