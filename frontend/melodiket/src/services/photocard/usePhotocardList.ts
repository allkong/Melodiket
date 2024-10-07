import { Photocard, PhotocardList } from '@/types/photocard';
import { dehydrate, useSuspenseQuery } from '@tanstack/react-query';
import photocardKey from './photocardKey';
import customFetch from '../customFetch';
import getQueryClient from '@/utils/getQueryClient';

const getPhotocardList = async () => {
  return await customFetch<PhotocardList>('/photo-cards/me');
};

export const usePhotocardList = () => {
  const response = useSuspenseQuery<Photocard[], Error>({
    queryKey: photocardKey.list(),
    queryFn: async () => {
      const response = await getPhotocardList();
      return response.result;
    },
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
