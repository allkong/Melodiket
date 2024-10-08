import { dehydrate, useMutation, useQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import type { FavoriteMusician } from '@/types/favorite';
import getQueryClient from '@/utils/getQueryClient';
import favoriteKey from './favoriteKey';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';

export const fetchFavoriteMusiciansList = async () => {
  const response = await customFetch<FavoriteMusician>(
    '/users/musicians/liked/me'
  );
  return response;
};

export const useFetchFavoriteMusiciansList = () => {
  const { user } = useAuthStore();

  const response = useQuery({
    queryKey: favoriteKey.musicians(),
    queryFn: fetchFavoriteMusiciansList,
    enabled: !!user,
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

export const toggleFavoriteConcert = async (concertUuid: string) => {
  const response = await customFetch<{ isFavorite: boolean }>(
    `/concerts/${concertUuid}/favorite`,
    { method: 'post' }
  );

  return response;
};

export const useToggleFavoriteConcert = () => {
  const mutate = useMutation({
    mutationFn: ({ concertUuid }: { concertUuid: string }) =>
      toggleFavoriteConcert(concertUuid),
  });

  return mutate;
};

const toggleFavoriteMusician = async (musicianUuid: string) => {
  const response = await customFetch<{ status: boolean }>(
    `/users/musicians/${musicianUuid}/like`,
    { method: 'post' }
  );

  return response;
};

export const useToggleFavoriteMusician = () => {
  return useMutation({
    mutationFn: (musicianUuid: string) => toggleFavoriteMusician(musicianUuid),
    onSuccess: (data) => {
      toast(`찜 ${data.status ? '추가' : '제거'}`, {
        icon: '💜',
      });
    },
    onError: () => {
      toast.error('찜 실패');
    },
  });
};
