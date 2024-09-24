import Image from 'next/image';

import clsx from 'clsx';

interface CarouselImageProps {
  size?: 'md' | 'lg';
  image: string;
}

const CarouselImage = ({ size = 'md', image }: CarouselImageProps) => {
  return (
    <div
      className={clsx('relative w-full flex-shrink-0', {
        'h-[250px]': size === 'md',
        'h-[360px]': size === 'lg',
      })}
    >
      <Image src={image} alt="carousel 이미지" className="object-cover" fill />
      <div
        className={clsx(
          'absolute w-full top-0 bottom-0 left-0 right-0 bg-[radial-gradient(circle_at_50%_75%,rgba(0,0,0,0.2),black)] opacity-90',
          {
            'h-[250px]': size === 'md',
            'h-[360px]': size === 'lg',
          }
        )}
      ></div>
    </div>
  );
};

export default CarouselImage;
