import { Photocard, PhotocardList } from '@/types/photocard';
import { dehydrate, useQuery } from '@tanstack/react-query';
import photocardKey from './photocardKey';
import customFetch from '../customFetch';
import getQueryClient from '@/utils/getQueryClient';
import useAuthStore from '@/store/authStore';

const getPhotocardList = async () => {
  return await customFetch<PhotocardList>('/photo-cards/me');
};

export const usePhotocardList = () => {
  const { user } = useAuthStore();

  const response = useQuery<Photocard[], Error>({
    queryKey: photocardKey.list(),
    queryFn: async () => {
      const response = await getPhotocardList();
      return response.result;
    },
    enabled: !!user,
  });

  return response;
};

export const usePhotocardListDehydrateState = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery<Photocard[], Error>({
    queryKey: photocardKey.list(),
    queryFn: async () => {
      const response = await getPhotocardList();
      return response.result;
    },
  });

  return dehydrate(queryClient);
};
