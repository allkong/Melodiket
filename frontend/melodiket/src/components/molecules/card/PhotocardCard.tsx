import Image from 'next/image';
import Link from 'next/link';

interface PhotocardCardProps {
  href: string;
  src: string;
  title: string;
}

const PhotocardCard = ({ href, src, title }: PhotocardCardProps) => {
  return (
    <Link href={href || ''}>
      <div className="w-[10.6rem] space-y-2">
        <div className="relative w-full h-60 overflow-hidden rounded-md">
          <Image src={src} alt="photocard" className="object-cover" fill />
        </div>
        <p className="font-medium text-xs line-clamp-1 w-full">{title}</p>
      </div>
    </Link>
  );
};

export default PhotocardCard;
