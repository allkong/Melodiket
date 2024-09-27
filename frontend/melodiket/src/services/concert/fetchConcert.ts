import { CarouselConcert, ConcertListItem } from '@/types/concert';
import customFetch from '../customFetch';
import { dehydrate, useQuery } from '@tanstack/react-query';
import concertKey from './concertKey';
import getQueryClient from '@/utils/getQueryClient';

export const fetchCarouselList = async () => {
  const response = await customFetch<CarouselConcert[]>(
    '/api/v1/concerts/carousel'
  );
  return response;
};

export const useFetchCarouselList = () => {
  const result = useQuery({
    queryKey: concertKey.carousel(),
    queryFn: fetchCarouselList,
  });
  return result;
};

export const useFetchCarouselListDehydrateState = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: concertKey.carousel(),
    queryFn: fetchCarouselList,
  });

  return dehydrate(queryClient);
};

export const fetchConcertList = async () => {
  const response = await customFetch<ConcertListItem[]>('/api/v1/concerts');
  return response;
};

export const useFetchConcertList = () => {
  const result = useQuery<ConcertListItem[]>({
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
