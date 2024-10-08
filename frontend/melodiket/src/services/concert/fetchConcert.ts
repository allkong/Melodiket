import { FetchConcertDetail, FetchConcertResponse } from '@/types/concert';
import customFetch from '../customFetch';
import {
  dehydrate,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import concertKey from './concertKey';
import getQueryClient from '@/utils/getQueryClient';
import type {
  TicketBookRequest,
  TicketBookResponse,
  FetchConcertRequest,
} from '@/types/ticket';

export const fetchConcertList = async ({
  isFirstPage,
  lastUuid,
  pageSize,
  orderKey,
  orderDirection,
  title,
}: FetchConcertRequest) => {
  const response = await customFetch<FetchConcertResponse>(
    `/concerts?isFirstPage=${isFirstPage}&pageSize=${pageSize}&orderKey=${orderKey}&orderDirection=${orderDirection}&lastUuid=${lastUuid ?? ''}&title=${title}`
  );
  return response;
};

export const useFetchInfiniteConcert = (
  pageSize: number = 2,
  orderKey: string = 'uuid',
  orderDirection: 'ASC' | 'DESC' = 'ASC',
  title: string = ''
) => {
  const result = useInfiniteQuery({
    queryKey: concertKey.infinite({
      pageSize,
      orderKey,
      orderDirection,
      title,
    }),
    queryFn: ({ pageParam }) => fetchConcertList(pageParam),
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage ?? {};
      if (!pageInfo || !pageInfo.hasNextPage) {
        return null;
      }

      return {
        isFirstPage: false,
        lastUuid: lastPage.pageInfo.lastUuid,
        orderDirection,
        orderKey,
        pageSize,
        title,
      };
    },
    initialPageParam: {
      isFirstPage: true,
      orderDirection,
      orderKey,
      pageSize,
      title,
    },
  });

  return result;
};

export const useFetchConcertList = () => {
  const result = useSuspenseQuery<FetchConcertResponse>({
    queryKey: concertKey.list(),
    queryFn: () =>
      fetchConcertList({
        isFirstPage: true,
        orderDirection: 'ASC',
        orderKey: 'uuid',
        pageSize: 10,
      }),
  });

  return result;
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

export const bookTicket = async (request: TicketBookRequest) => {
  const response = await customFetch<TicketBookResponse>('/tickets', {
    method: 'post',
    body: request,
  });

  return response;
};

export const useBookTicket = () => {
  const mutate = useMutation({
    mutationFn: ({
      ticketBookRequest,
    }: {
      ticketBookRequest: TicketBookRequest;
    }) => bookTicket(ticketBookRequest),
    throwOnError: true,
  });
  return mutate;
};
