'use client';

import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import { useFetchFavoriteMusiciansList } from '@/services/favorite/fetchFavoriteMusiciansList';

const FavoriteMusicianSection = () => {
  const { data } = useFetchFavoriteMusiciansList();

  return (
    <>
      {data.map((musician) => (
        <MusicianProfileCard key={musician.id} {...musician} />
      ))}
    </>
  );
};

export default FavoriteMusicianSection;
