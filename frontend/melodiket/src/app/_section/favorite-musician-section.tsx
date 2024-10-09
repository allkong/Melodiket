'use client';

import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import { useFetchFavoriteMusiciansList } from '@/services/favorite/fetchFavorite';

const FavoriteMusicianSection = () => {
  const { data } = useFetchFavoriteMusiciansList();
  const { pageInfo, result } = data ?? {};

  return (
    <>
      {pageInfo &&
        pageInfo?.responsedSize > 0 &&
        result?.map((musician) => (
          <MusicianProfileCard
            key={musician.loginId}
            musicianName={musician.nickname}
            src={musician.imageUrl}
          />
        ))}
      {pageInfo?.responsedSize === 0 && <div>등록된 뮤지션이 없어요.</div>}
    </>
  );
};

export default FavoriteMusicianSection;
