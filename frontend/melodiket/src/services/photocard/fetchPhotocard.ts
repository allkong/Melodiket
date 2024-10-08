import { dehydrate, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import customFetch from '../customFetch';
import photocardKey from './photocardKey';
import getQueryClient from '@/utils/getQueryClient';
import { Photocard, PhotocardDetail, PhotocardList } from '@/types/photocard';
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

const getPhotocardDetail = async (uuid: string) => {
  return await customFetch<PhotocardDetail>(`/photo-cards/${uuid}`);
};

export const usePhotocardDetail = () => {
  const params = useParams();
  const uuid = params?.uuid;

  return useQuery<PhotocardDetail>({
    queryKey: photocardKey.detail(uuid as string),
    queryFn: () => getPhotocardDetail(uuid as string),
    enabled: !!uuid,
  });
};
