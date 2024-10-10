import {
  ConcertData,
  CreateConcertResponse,
  ConcertDetail,
  FetchConcertResponse,
  FetchMyConcertsResponse,
  ConcertResp,
  ConcertRespInfo,
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
import useAuthStore from '@/store/authStore';

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
  options: {
    pageSize?: number;
    orderKey?: string;
    orderDirection?: 'ASC' | 'DESC';
    title?: string;
  } = {}
) => {
  const {
    pageSize = 6,
    orderKey = 'createdAt',
    orderDirection = 'ASC',
    title = '',
  } = options;

  const { user } = useAuthStore();

  const result = useInfiniteQuery({
    queryKey: concertKey.infinite({
      pageSize,
      orderKey,
      orderDirection,
      title,
      user,
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
        orderKey: 'createdAt',
        pageSize: 10,
        title: '',
      }),
  });

  return result;
};

export const fetchConcertDetail = async (uuid: string) => {
  const response = await customFetch<ConcertDetail>(`/concerts/${uuid}`);
  return response;
};

export const useFetchConcertDetail = (uuid: string) => {
  const { user } = useAuthStore();

  return useQuery<ConcertDetail>({
    queryKey: concertKey.detail(uuid, user),
    queryFn: () => fetchConcertDetail(uuid),
  });
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
    // throwOnError: true,
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

const getMyConcerts = async () => {
  const response = await customFetch<ConcertResp>('/concerts/me/created', {
    method: 'GET',
  });
  return response;
};

export const useGetMyConcerts = () => {
  return useMutation<ConcertResp, Error>({
    mutationFn: () => getMyConcerts(),
    onError: () => {
      alert('내 공연 목록 가져오기 실패!');
    },
  });
};

const getConcertInfo = async (id: string) => {
  const response = await customFetch<ConcertRespInfo>(`/concerts/${id}`, {
    method: 'GET',
  });
  return response;
};

export const useGetConcertInfo = () => {
  return useMutation<ConcertRespInfo, Error, string>({
    mutationFn: (id) => getConcertInfo(id),
    onError: () => {
      alert('공연 정보 가져오기 실패!');
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

export const fetchRemainSeat = async (concertUuid: string) => {
  const response = await customFetch<boolean[][]>(
    `/concerts/seats/${concertUuid}`
  );
  return response;
};

export const useFetchRemainSeat = (concertUuid: string) => {
  const result = useQuery({
    queryKey: [],
    queryFn: () => fetchRemainSeat(concertUuid),
    gcTime: 0,
  });
  return result;
};
