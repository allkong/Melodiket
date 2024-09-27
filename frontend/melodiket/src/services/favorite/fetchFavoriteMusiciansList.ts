import customFetch from '../customFetch';
import type { FavoriteMusician } from '@/types/favorite';

const fetchFavoriteMusiciansList = async () => {
  const response = await customFetch<FavoriteMusician[]>(
    '/api/v1/musicians/liked/me'
  );
  return response;
};

export default fetchFavoriteMusiciansList;
