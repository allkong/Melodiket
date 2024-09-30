import clsx from 'clsx';
import Image from 'next/image';

import defaultImage from '@/public/images/default-image.png';

interface PosterImageProps {
  src: string;
  size: 'sm' | 'md';
}

const PosterImage = ({ src, size }: PosterImageProps) => {
  return (
    <div
      className={clsx('relative flex-shrink-0 overflow-hidden', {
        'w-[4.5rem] h-[6.2rem] rounded-[0.2rem]': size === 'sm',
        'w-24 h-[8.5rem] rounded-[0.3rem]': size === 'md',
      })}
    >
      <Image
        src={src || defaultImage}
        alt="poster"
        className="object-cover"
        fill
        priority
      />
    </div>
  );
};

export default PosterImage;
