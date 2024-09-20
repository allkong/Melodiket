import Image from 'next/image';

interface BackgroundImageProps {
  src: string;
}

const BackgroundImage = ({ src }: BackgroundImageProps) => {
  return (
    <div className="relative flex items-center justify-center w-full h-64 overflow-hidden bg-gray-400">
      <div className="absolute inset-0" />
      <Image src={src} alt="cover" className="object-cover" fill />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.3)_0%,_rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  );
};

export default BackgroundImage;
