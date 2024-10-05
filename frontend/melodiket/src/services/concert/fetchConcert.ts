import { FetchConcertDetail, FetchConcertList } from '@/types/concert';
import customFetch from '../customFetch';
import {
  dehydrate,
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import concertKey from './concertKey';
import getQueryClient from '@/utils/getQueryClient';

export const fetchConcertList = async () => {
  const response = await customFetch<FetchConcertList>('/concerts');
  return response;
};

export const fetchInfiniteConcert = async (cursor: string) => {
  const response = await customFetch<FetchConcertList>(
    `/concerts?cursor=${cursor}`
  );
  return response;
};

export const useFetchInfiniteConcert = () => {
  const result = useInfiniteQuery({
    queryKey: [],
    queryFn: ({ pageParam }) => fetchInfiniteConcert(`${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        // return lastPage.result[lastPage.result.length - 1].concertUuid;
        return 1;
      } else {
        return undefined;
      }
    },
  });

  return result;
};

export const useFetchConcertList = () => {
  const result = useSuspenseQuery<FetchConcertList>({
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
  const response = await customFetch<FetchConcertDetail>(`/concerts/${uuid}`);
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
