import { ConcertListItem } from '@/types/concert';
import customFetch from '../customFetch';
import { dehydrate, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import concertKey from './concertKey';
import getQueryClient from '@/utils/getQueryClient';

const concertList = async () => {
  const response = await customFetch<ConcertListItem>('/api/v1/concerts');
  return response;
};

export const useConcertList = () => {
  const result = useSuspenseQuery<ConcertListItem[]>({
    queryKey: concertKey.list(),
    queryFn: concertList,
  });

  return result;
};

export const useConcertListDehydrateState = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: concertKey.list(),
    queryFn: concertList,
  });

  return dehydrate(queryClient);
};

export default useConcertList;
