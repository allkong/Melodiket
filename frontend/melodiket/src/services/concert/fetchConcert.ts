import { Concert, FetchConcertList } from '@/types/concert';
import customFetch from '../customFetch';
import { dehydrate, useQuery } from '@tanstack/react-query';
import concertKey from './concertKey';
import getQueryClient from '@/utils/getQueryClient';

export const fetchConcertList = async () => {
  const response = await customFetch<FetchConcertList>('/concerts');
  return response;
};

export const useFetchConcertList = () => {
  const result = useQuery<FetchConcertList>({
    queryKey: concertKey.list(),
    queryFn: fetchConcertList,
  });

  return result;
};

export const useFetchConcertListDehydrateState = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: concertKey.list(),
    queryFn: fetchConcertList,
  });

  return dehydrate(queryClient);
};

export const fetchConcertDetail = async (uuid: string) => {
  const response = await customFetch<Concert>(`/concerts/${uuid}`);
  return response;
};

export const useFetchConcertDetail = (uuid: string) => {
  const result = useQuery({
    queryKey: concertKey.detail(uuid),
    queryFn: () => fetchConcertDetail(uuid),
  });
  return result;
};

export const useFetchConcertDetailDehydrateState = async (uuid: string) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: concertKey.detail(uuid),
    queryFn: () => fetchConcertDetail(uuid),
  });

  return dehydrate(queryClient);
};
