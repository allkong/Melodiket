import Image from 'next/image';

import defaultImage from '@/public/images/default-image.png';

interface DarkedImageProps {
  src: string;
}

const DarkedImage = ({ src }: DarkedImageProps) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src || defaultImage}
        alt="콘서트 상세 페이지 배경 이미지"
        fill
        className="object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
    </div>
  );
};

export default DarkedImage;
