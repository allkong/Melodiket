import Image from 'next/image';

interface PhotocardFrontProps {
  src: string;
}

const PhotocardFront = ({ src }: PhotocardFrontProps) => {
  return (
    <div className="w-[20.7rem] h-[31rem] relative rounded-lg overflow-hidden border border-gray-200">
      <Image src={src} alt="photocard" fill className="object-cover" />
    </div>
  );
};

export default PhotocardFront;
