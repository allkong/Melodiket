import Image from 'next/image';

interface PosterImageProps {
  src: string;
  width: string;
  height: string;
}

const PosterImage = ({ src, width, height }: PosterImageProps) => {
  return (
    <div
      className={`relative flex-shrink-0 w-[${width}] h-[${height}] overflow-hidden rounded-[0.2rem]`}
    >
      <Image src={src} alt="poster" className="object-cover" fill />
    </div>
  );
};

export default PosterImage;
