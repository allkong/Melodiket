import Link from 'next/link';
import { useState } from 'react';

import { useToggleFavoriteMusician } from '@/services/favorite/fetchFavorite';

import Profile from '@/components/atoms/profile/Profile';
import FavoriteButton from '@/components/atoms/button/FavoriteButton';

interface MusicianItemProps {
  uuid: string;
  src: string;
  musicianName: string;
  initialFavoriteCount: number;
  initialFavorite: boolean;
}

const MusicianItem = ({
  uuid,
  src,
  musicianName,
  initialFavoriteCount,
  initialFavorite,
}: MusicianItemProps) => {
  const { mutate: toggleFavorite } = useToggleFavoriteMusician();

  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [likeCount, setLikeCount] = useState(initialFavoriteCount);

  const handleFavoriteToggle = async () => {
    toggleFavorite(uuid, {
      onSuccess: (data) => {
        console.log(data.status);
        setIsFavorite(data.status);
        setLikeCount((prevCount) =>
          data.status ? prevCount + 1 : prevCount - 1
        );
      },
    });
  };

  return (
    <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-purple-50">
      <Link href={`/musicians/${uuid}` || '/'} className="w-full">
        <div className="flex items-center space-x-4 flex-grow">
          <Profile src={src} size="sm" />
          <div className="flex space-x-3">
            <p className="font-medium">{musicianName}</p>
            <span className="text-primary">{likeCount}</span>
          </div>
        </div>
      </Link>
      <FavoriteButton isOn={isFavorite} onClick={handleFavoriteToggle} />
    </div>
  );
};

export default MusicianItem;
