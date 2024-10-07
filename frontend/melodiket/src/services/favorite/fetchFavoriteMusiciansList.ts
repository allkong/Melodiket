import { dehydrate, useMutation, useQuery } from '@tanstack/react-query';
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

export const toggleFavorite = async (concertUuid: string) => {
  const response = await customFetch<{ isFavorite: boolean }>(
    `/concerts/${concertUuid}/favorite`,
    { method: 'post' }
  );

  return response;
};

export const useToggleFavorite = () => {
  const mutate = useMutation({
    mutationFn: ({ concertUuid }: { concertUuid: string }) =>
      toggleFavorite(concertUuid),
  });

  return mutate;
};
