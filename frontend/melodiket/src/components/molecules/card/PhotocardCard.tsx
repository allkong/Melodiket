import Image from 'next/image';

interface PhotocardCardProps {
  src: string;
  title: string;
}

const PhotocardCard = ({ src, title }: PhotocardCardProps) => {
  const blurDataUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/p8BAzAOZUEAMf0SZ24GauoAAAAASUVORK5CYII=';
  return (
    <div className="w-[10.6rem] space-y-2">
      <div className="relative w-full h-60 overflow-hidden rounded-md">
        <Image
          src={src}
          alt="photocard"
          className="object-cover"
          fill
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
      </div>
      <p className="font-medium text-xs line-clamp-1 w-full">{title}</p>
    </div>
  );
};

export default PhotocardCard;
