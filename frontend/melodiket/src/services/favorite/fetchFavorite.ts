import { dehydrate, useMutation, useQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import type { FavoriteMusician } from '@/types/favorite';
import getQueryClient from '@/utils/getQueryClient';
import favoriteKey from './favoriteKey';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';
import { FetchFavoriteResponse } from '@/types/concert';

export const fetchFavoriteMusiciansList = async () => {
  const response = await customFetch<FavoriteMusician>(
    '/users/musicians/liked/me'
  );
  return response;
};

export const useFetchFavoriteMusiciansList = () => {
  const { user } = useAuthStore();

  const response = useQuery({
    queryKey: favoriteKey.musicians(user),
    queryFn: fetchFavoriteMusiciansList,
    enabled: !!user,
  });

  return response;
};

export const useFetchFavoriteMusiciansListDehydrateState = () => {
  const { user } = useAuthStore();
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: favoriteKey.musicians(user),
    queryFn: fetchFavoriteMusiciansList,
  });

  return dehydrate(queryClient);
};

export const fetchFavoriteConcert = async () => {
  const response = await customFetch<FetchFavoriteResponse[]>(
    '/concerts/favorite/me'
  );
  return response;
};

export const useFetchFavoriteConcert = () => {
  const { user } = useAuthStore();

  const result = useQuery({
    queryKey: favoriteKey.concerts(user),
    queryFn: fetchFavoriteConcert,
    enabled: !!user,
  });
  return result;
};

export const toggleFavoriteConcert = async (concertUuid: string) => {
  const response = await customFetch<{ isLike: boolean }>(
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
      if (data.status) {
        toast('찜 추가', {
          icon: '💜',
        });
      } else {
        toast('찜 제거', {
          icon: '🤍',
        });
      }
    },
    onError: () => {
      toast.error('관객만 좋아요를 누를 수 있어요.');
    },
  });
};
