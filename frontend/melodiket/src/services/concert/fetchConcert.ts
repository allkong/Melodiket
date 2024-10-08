import {
  ConcertData,
  CreateConcertResponse,
  FetchConcertDetail,
  FetchConcertResponse,
  FetchMyConcertsResponse,
} from '@/types/concert';
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
  const response = await customFetch<FetchConcertResponse>(
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
  const result = useSuspenseQuery<FetchConcertResponse>({
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

const getMyAssignedConcerts = async () => {
  const response = await customFetch<FetchMyConcertsResponse>(
    '/concerts/me/assigned',
    {
      method: 'GET',
    }
  );

  return response;
};

export const useGetMyAssignedConcerts = () => {
  return useMutation<FetchMyConcertsResponse, Error>({
    mutationFn: () => getMyAssignedConcerts(),
    onError: () => {
      alert('내 공연 목록 가져오기 실패!');
    },
  });
};

const createConcert = async (concertData: ConcertData) => {
  const response = await customFetch<CreateConcertResponse>(
    '/concerts/create',
    {
      method: 'POST',
      body: concertData,
    }
  );
  return response;
};

export const useCreateConcert = () => {
  return useMutation<CreateConcertResponse, Error, ConcertData>({
    mutationFn: (concertData) => createConcert(concertData),
    onError: () => {
      alert('공연 등록 실패!');
    },
  });
};
