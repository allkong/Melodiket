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

interface FetchConcertRequest {
  isFirstPage?: boolean;
  lastUuid?: string;
  pageSize?: number;
  orderKey?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export const fetchConcertList = async (
  {
    isFirstPage,
    lastUuid,
    pageSize,
    orderKey,
    orderDirection,
  }: FetchConcertRequest = {
    isFirstPage: true,
    pageSize: 10,
    orderDirection: 'ASC',
    orderKey: 'uuid',
  }
) => {
  const response = await customFetch<FetchConcertList>(
    `/concerts?isFirstPage=${isFirstPage}&pageSize=${pageSize}&orderKey=${orderKey}&orderDirection=${orderDirection}&lastUuid=${lastUuid ?? ''}`
  );
  return response;
};

export const useFetchInfiniteConcert = (
  pageSize: number = 10,
  orderKey: string = 'uuid',
  orderDirection: 'ASC' | 'DESC' = 'ASC'
) => {
  const result = useInfiniteQuery({
    queryKey: concertKey.infinite(),
    queryFn: ({ pageParam }) => fetchConcertList(pageParam),
    getNextPageParam: (lastPage) => {
      const { pageInfo, result } = lastPage ?? {};
      if (!pageInfo || !pageInfo.hasNextPage) {
        return undefined;
      }

      return {
        isFirstPage: false,
        lastUuid: result[result.length - 1].concertUuid,
        orderDirection,
        orderKey,
        pageSize,
      };
    },
    initialPageParam: {
      isFirstPage: true,
      orderDirection,
      orderKey,
      pageSize,
    },
  });

  return result;
};

export const useFetchConcertList = () => {
  const result = useSuspenseQuery<FetchConcertList>({
    queryKey: concertKey.list(),
    queryFn: () => fetchConcertList(),
  });

  return result;
};

export const useFetchConcertListDehydrateState = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: concertKey.list(),
    queryFn: () => fetchConcertList(),
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
