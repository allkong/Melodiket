import FavoriteProfile from './FavoriteProfile';

interface MusicianProfileCardProps {
  src: string;
  musicianName: string;
}

const MusicianProfileCard = ({
  src,
  musicianName,
}: MusicianProfileCardProps) => {
  return (
    <div className="flex flex-col items-center px-4 py-4 space-y-3.5 bg-white w-fit rounded-md shadow-[1px_1px_10px_rgba(143,0,255,0.2)]">
      <FavoriteProfile src={src} size="md" />
      <p className="text-sm">{musicianName}</p>
    </div>
  );
};

export default MusicianProfileCard;
