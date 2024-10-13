import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

import customFetch from '../customFetch';
import concertKey from './concertKey';
import useAuthStore from '@/store/authStore';
import {
  ConcertData,
  CreateConcertResponse,
  ConcertDetail,
  FetchConcertResponse,
  FetchMyConcertsResponse,
  ConcertResp,
  ConcertRespInfo,
} from '@/types/concert';
import type {
  TicketBookRequest,
  TicketBookResponse,
  FetchConcertRequest,
} from '@/types/ticket';
import { Error } from '@/types/error';
import { SORT_OPTIONS } from '@/constants/controlOptions';

export const fetchConcertList = async ({
  isFirstPage,
  lastUuid,
  pageSize,
  title,
  isNowBooking,
  currentSort,
}: FetchConcertRequest) => {
  let orderKey: string;
  let orderDirection: 'ASC' | 'DESC';
  if (currentSort === 'alphabetical') {
    orderKey = 'title';
    orderDirection = 'ASC';
  } else if (currentSort === 'latest') {
    orderKey = 'ticketingAt';
    orderDirection = 'DESC';
  } else if (currentSort === 'registration') {
    orderKey = 'createdAt';
    orderDirection = 'DESC';
  } else {
    orderKey = 'likeCount';
    orderDirection = 'DESC';
  }

  const response = await customFetch<FetchConcertResponse>(
    `/concerts?isFirstPage=${isFirstPage}&pageSize=${pageSize}&orderDirection=${orderDirection}&lastUuid=${lastUuid ?? ''}&title=${title}&status=ACTIVE${isNowBooking ? '' : '&status=TRANSFERRED'}&orderKey=${orderKey}`
  );
  return response;
};

export const useFetchInfiniteConcert = (
  options: {
    pageSize?: number;
    title?: string;
    isNowBooking?: boolean;
    currentSort?: keyof typeof SORT_OPTIONS;
  } = {}
) => {
  const {
    pageSize = 4,
    title = '',
    isNowBooking = false,
    currentSort = 'popularity',
  } = options;

  const { user } = useAuthStore();

  const result = useInfiniteQuery({
    queryKey: concertKey.infinite({
      pageSize,
      title,
      user,
      isNowBooking,
      currentSort,
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
        pageSize,
        title,
        isNowBooking,
        currentSort,
      };
    },
    initialPageParam: {
      isFirstPage: true,
      pageSize,
      title,
      isNowBooking,
      currentSort,
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
        orderDirection: 'DESC',
        pageSize: 10,
        title: '',
        currentSort: 'popularity',
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
    onError: (error: Error) => {
      if (error.detailCode === 'E409004') {
        toast.error('잔액이 부족합니다.');
      }
    },
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
      toast.error('내 공연 목록 가져오기 실패!');
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
      toast.error('내 공연 목록 가져오기 실패!');
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
      toast.error('공연 정보 가져오기 실패!');
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
      toast.error('공연 등록 실패!');
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
