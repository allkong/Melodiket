import Image from 'next/image';

import { getBlurDataUrl } from '@/utils/getUrl';

import RotateButton from '@/components/atoms/button/RotateButton';

interface PhotocardFrontProps {
  src: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const PhotocardFront = ({ src, onClick }: PhotocardFrontProps) => {
  return (
    <div className="w-[20.7rem] h-[33.3rem] relative rounded-lg overflow-hidden border border-gray-200">
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
    </div>
  );
};

export default PhotocardFront;
