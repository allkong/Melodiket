import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useToggleFavoriteMusician } from '@/services/favorite/fetchFavorite';
import useAuthStore from '@/store/authStore';

import Profile from '@/components/atoms/profile/Profile';
import FavoriteButton from '@/components/atoms/button/FavoriteButton';

interface MusicianItemProps {
  uuid: string;
  src: string;
  musicianName: string;
  initialFavoriteCount: number;
  initialFavorite: boolean;
  onClick?: () => void;
}

const MusicianItem = ({
  uuid,
  src,
  musicianName,
  initialFavoriteCount,
  initialFavorite,
  onClick,
}: MusicianItemProps) => {
  const { user } = useAuthStore();
  const { mutate: toggleFavorite } = useToggleFavoriteMusician();

  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [likeCount, setLikeCount] = useState(initialFavoriteCount);

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast('로그인이 필요한 서비스예요', { icon: `😥` });
      return;
    } else if (user.role !== 'AUDIENCE') {
      toast('관객만 좋아요를 누를 수 있어요', { icon: `😥` });
      return;
    }

    toggleFavorite(uuid, {
      onSuccess: (data) => {
        setIsFavorite(data.status);
        setLikeCount((prevCount) =>
          data.status ? prevCount + 1 : prevCount - 1
        );
        onClick?.();
      },
    });
  };

  return (
    <Link href={`/musicians/${uuid}` || '/'} className="w-full">
      <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-purple-50">
        <div className="flex items-center space-x-4 flex-grow">
          <Profile src={src} size="sm" />
          <div className="flex space-x-3">
            <p className="font-medium">{musicianName}</p>
            <span className="text-primary">{likeCount}</span>
          </div>
        </div>
        <FavoriteButton
          isOn={isFavorite}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFavoriteToggle();
          }}
        />
      </div>
    </Link>
  );
};

export default MusicianItem;
