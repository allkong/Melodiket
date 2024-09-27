import { CarouselConcert, ConcertListItem } from '@/types/concert';
import customFetch from '../customFetch';
import { dehydrate, useSuspenseQuery } from '@tanstack/react-query';
import concertKey from './concertKey';
import getQueryClient from '@/utils/getQueryClient';

export const fetchCarouselConcertList = async () => {
  const response = await customFetch<CarouselConcert[]>(
    '/api/v1/concerts/carousel'
  );
  return response;
};

export const fetchConcertList = async () => {
  const response = await customFetch<ConcertListItem[]>('/api/v1/concerts');
  return response;
};

export const useConcertList = () => {
  const result = useSuspenseQuery<ConcertListItem[]>({
    queryKey: concertKey.list(),
    queryFn: fetchConcertList,
  });

  return result;
};

export const useConcertListDehydrateState = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: concertKey.list(),
    queryFn: fetchConcertList,
  });

  return dehydrate(queryClient);
};

export default useConcertList;
