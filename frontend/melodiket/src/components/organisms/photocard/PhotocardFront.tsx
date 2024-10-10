import Image from 'next/image';

import { getBlurDataUrl } from '@/utils/getUrl';

import RotateButton from '@/components/atoms/button/RotateButton';
import PhotocardFrame from './PhotocardFrame';

interface PhotocardFrontProps {
  src: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const PhotocardFront = ({ src, onClick }: PhotocardFrontProps) => {
  return (
    <PhotocardFrame isCreated>
      <Image
        src={src}
        alt="photocard"
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={getBlurDataUrl()}
      />

      <div className="absolute bottom-0 right-0 px-3 py-3">
        <RotateButton onClick={onClick} />
      </div>
    </PhotocardFrame>
  );
};

export default PhotocardFront;
