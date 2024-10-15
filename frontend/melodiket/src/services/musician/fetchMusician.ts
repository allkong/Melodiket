import {
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import customFetch from '../customFetch';
import {
  ConcertByMusicianRequest,
  ConcertByMusicianResponse,
  FetchMusiciansResponse,
  MusicianDetail,
  PageParam,
} from '@/types/musician';
import musicianKey from './musicianKey';
import useAuthStore from '@/store/authStore';
import { SORT_OPTIONS } from '@/constants/controlOptions';
import { useEffect } from 'react';

export const getMusicians = async ({
  isFirstPage,
  lastUuid,
  pageSize,
  query,
  currentSort,
}: PageParam): Promise<FetchMusiciansResponse> => {
  let orderKey: string;
  let orderDirection: 'ASC' | 'DESC';
  if (currentSort === 'alphabetical') {
    orderKey = 'nickname';
    orderDirection = 'ASC';
  } else if (currentSort === 'latest') {
    orderKey = 'registeredAt';
    orderDirection = 'DESC';
  } else if (currentSort === 'registration') {
    orderKey = 'registeredAt';
    orderDirection = 'ASC';
  } else {
    orderKey = 'likeCount';
    orderDirection = 'DESC';
  }

  const queryParams = `isFirstPage=${isFirstPage}&lastUuid=${lastUuid || ''}&pageSize=${pageSize}&name=${query}&orderKey=${orderKey}&orderDirection=${orderDirection}`;

  const response = await customFetch<FetchMusiciansResponse>(
    `/users/musicians?${queryParams}`
  );
  return response;
};

export const useMusiciansQuery = (
  options: {
    pageSize?: number;
    query?: string;
    currentSort?: keyof typeof SORT_OPTIONS;
  } = {}
) => {
  const { pageSize = 5, query = '', currentSort = 'popularity' } = options;
  const { user } = useAuthStore();

  const result = useInfiniteQuery({
    queryKey: musicianKey.infinite({
      pageSize,
      query,
      user,
      currentSort,
    }),
    queryFn: ({ pageParam }) => getMusicians(pageParam),
    initialPageParam: {
      isFirstPage: true,
      pageSize,
      query,
      currentSort,
    },
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      return pageInfo.hasNextPage
        ? {
            isFirstPage: false,
            lastUuid: lastPage.pageInfo.lastUuid,
            pageSize,
            query,
            currentSort,
          }
        : null;
    },
  });

  useEffect(() => {
    result.refetch();
  }, [result.refetch, pageSize, query, user, currentSort]); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
};

export const useFetchMusicianList = () => {
  const result = useSuspenseQuery<FetchMusiciansResponse>({
    queryKey: musicianKey.list(),
    queryFn: () =>
      getMusicians({
        isFirstPage: true,
        orderDirection: 'DESC',
        pageSize: 10,
        query: '',
        currentSort: 'popularity',
      }),
  });

  return result;
};

export const getMusicianDetail = async (uuid: string) => {
  return await customFetch<MusicianDetail>(`/users/musicians/${uuid}`);
};

export const useMusicianDetail = (uuid: string) => {
  return useQuery<MusicianDetail>({
    queryKey: musicianKey.detail(uuid),
    queryFn: () => getMusicianDetail(uuid),
    enabled: !!uuid,
  });
};

const getConcertsByMusician = async ({
  musicianUuid,
  isNowBooking,
  currentSort,
  isFirstPage = true,
  lastUuid = '',
  pageSize = 5,
}: ConcertByMusicianRequest) => {
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

  const queryParams = `isFirstPage=${isFirstPage}&lastUuid=${lastUuid}&pageSize=${pageSize}&orderKey=${orderKey}&orderDirection=${orderDirection}&status=ACTIVE${isNowBooking ? '' : '&status=TRANSFERRED'}`;

  const response = await customFetch<ConcertByMusicianResponse>(
    `/concerts/by-musician/${musicianUuid}?${queryParams}`
  );
  return response;
};

export const useConcertsByMusician = (
  musicianUuid: string,
  isNowBooking: boolean,
  currentSort: keyof typeof SORT_OPTIONS,
  pageSize: number = 5
) => {
  return useInfiniteQuery({
    queryKey: musicianKey.concerts({
      musicianUuid,
      isNowBooking,
      currentSort,
      pageSize,
    }),
    queryFn: ({ pageParam = { isFirstPage: true, lastUuid: '' } }) =>
      getConcertsByMusician({
        musicianUuid,
        isNowBooking,
        currentSort,
        isFirstPage: pageParam.isFirstPage,
        lastUuid: pageParam.lastUuid || '',
        pageSize,
      }),
    initialPageParam: {
      isFirstPage: true,
      lastUuid: '',
      pageSize,
      musicianUuid,
      isNowBooking,
      currentSort,
    },
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      return pageInfo.hasNextPage
        ? {
            isFirstPage: false,
            lastUuid: lastPage.pageInfo.lastUuid,
            pageSize,
            musicianUuid,
            isNowBooking,
            currentSort,
          }
        : null;
    },
  });
};
