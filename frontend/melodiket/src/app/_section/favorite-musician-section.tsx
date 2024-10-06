'use client';

import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import { useFetchFavoriteMusiciansList } from '@/services/favorite/fetchFavoriteMusiciansList';
import useAuthStore from '@/store/authStore';

const FavoriteMusicianSection = () => {
  const { user } = useAuthStore();
  const { data } = useFetchFavoriteMusiciansList();
  const { pageInfo, result } = data ?? {};

  return (
    <>
      {user &&
        pageInfo &&
        pageInfo?.responsedSize > 0 &&
        result?.map((musician) => (
          <MusicianProfileCard
            key={musician.loginId}
            musicianName={musician.nickname}
            src={musician.imageUrl}
          />
        ))}
      {pageInfo?.responsedSize === 0 && <div>등록 된 뮤지션이 없어요.</div>}
    </>
  );
};

export default FavoriteMusicianSection;
