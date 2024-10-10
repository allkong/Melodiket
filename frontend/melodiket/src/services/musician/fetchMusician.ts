import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import {
  FetchMusiciansResponse,
  MusicianDetail,
  PageParam,
} from '@/types/musician';
import musicianKey from './musicianKey';

export const getMusicians = async (
  pageParam: PageParam = {
    isFirstPage: true,
    pageSize: 5,
    orderKey: 'uuid',
    orderDirection: 'ASC',
    query: '',
  }
): Promise<FetchMusiciansResponse> => {
  const { isFirstPage, lastUuid, pageSize, query } = pageParam;
  const queryParams = isFirstPage
    ? `isFirstPage=true&pageSize=${pageSize}&name=${query}`
    : `isFirstPage=false&lastUuid=${lastUuid}&pageSize=${pageSize}&name=${query}`;

  const response = await customFetch<FetchMusiciansResponse>(
    `/users/musicians?${queryParams}`
  );
  return response;
};

export const useMusiciansQuery = (
  pageSize: number = 5,
  orderKey: string = 'uuid',
  orderDirection: 'ASC' | 'DESC' = 'ASC',
  query: string = ''
) => {
  return useInfiniteQuery({
    queryKey: musicianKey.list({
      orderDirection,
      orderKey,
      pageSize,
      query,
    }),
    queryFn: ({ pageParam }) => getMusicians(pageParam),
    initialPageParam: {
      isFirstPage: true,
      pageSize,
      orderKey,
      orderDirection,
      query,
    },
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      return pageInfo.hasNextPage
        ? {
            isFirstPage: false,
            lastUuid: lastPage.pageInfo.lastUuid,
            pageSize,
            orderKey,
            orderDirection,
            query,
          }
        : null;
    },
  });
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
