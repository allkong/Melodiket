import { dehydrate, useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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

export const usePhotocardDetail = (uuid: string) => {
  return useQuery<PhotocardDetail>({
    queryKey: photocardKey.detail(uuid),
    queryFn: () => getPhotocardDetail(uuid),
    enabled: !!uuid,
  });
};

const postPhotocardUpload = async ({
  uuid,
  cid,
}: {
  uuid: string;
  cid: string;
}) => {
  return await customFetch('/photo-cards', {
    method: 'post',
    body: {
      ticketUuid: uuid,
      imageCid: cid,
    },
  });
};

export const usePhotocardUpload = () => {
  return useMutation({
    mutationFn: (photocard: { uuid: string; cid: string }) =>
      postPhotocardUpload(photocard),
    onError: () => {
      toast.error('포토카드 업로드 실패');
    },
    throwOnError: true,
  });
};
