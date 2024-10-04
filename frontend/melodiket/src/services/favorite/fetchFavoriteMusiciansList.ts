import { dehydrate, useQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import type { FavoriteMusician } from '@/types/favorite';
import getQueryClient from '@/utils/getQueryClient';
import favoriteKey from './favoriteKey';

export const fetchFavoriteMusiciansList = async () => {
  const response = await customFetch<FavoriteMusician>('/musicians/liked/me');
  return response;
};

export const useFetchFavoriteMusiciansList = () => {
  const response = useQuery({
    queryKey: favoriteKey.musicians(),
    queryFn: fetchFavoriteMusiciansList,
  });

  return response;
};

export const useFetchFavoriteMusiciansListDehydrateState = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: favoriteKey.musicians(),
    queryFn: fetchFavoriteMusiciansList,
  });

  return dehydrate(queryClient);
};
