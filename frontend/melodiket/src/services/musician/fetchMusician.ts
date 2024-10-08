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
  }
): Promise<FetchMusiciansResponse> => {
  const { isFirstPage, lastUuid, pageSize } = pageParam;
  const queryParams = isFirstPage
    ? `isFirstPage=true&pageSize=${pageSize}`
    : `isFirstPage=false&lastUuid=${lastUuid}&pageSize=${pageSize}`;

  const response = await customFetch<FetchMusiciansResponse>(
    `/users/musicians?${queryParams}`
  );
  return response;
};

export const useMusiciansQuery = (
  pageSize: number = 5,
  orderKey: string = 'uuid',
  orderDirection: 'ASC' | 'DESC' = 'ASC'
) => {
  return useInfiniteQuery({
    queryKey: musicianKey.list(),
    queryFn: ({ pageParam }) => getMusicians(pageParam),
    initialPageParam: { isFirstPage: true, pageSize, orderKey, orderDirection },
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      return pageInfo.hasNextPage
        ? {
            isFirstPage: false,
            lastUuid: lastPage.pageInfo.lastUuid,
            pageSize,
            orderKey,
            orderDirection,
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
