import Image from 'next/image';

import { getBlurDataUrl } from '@/utils/getUrl';
import defaultImage from '@/public/images/default-image.png';

interface PhotocardCardProps {
  src: string;
  title: string;
}

const PhotocardCard = ({ src, title }: PhotocardCardProps) => {
  return (
    <div className="w-[10.6rem] space-y-2">
      <div className="relative w-full h-60 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={src || defaultImage}
          alt="photocard"
          className="object-cover"
          fill
          placeholder="blur"
          blurDataURL={getBlurDataUrl()}
        />
      </div>
      <p className="font-medium text-xs line-clamp-1 w-full">{title}</p>
    </div>
  );
};

export default PhotocardCard;
