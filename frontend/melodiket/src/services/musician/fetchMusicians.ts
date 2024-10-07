import { useInfiniteQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import { FetchMusiciansResponse, PageParam } from '@/types/musician';

export const fetchGetMusicians = async (
  pageParam: PageParam = {
    isFirstPage: true,
    pageSize: 5,
    orderKey: 'uuid',
    orderDirection: 'ASC',
  }
): Promise<FetchMusiciansResponse> => {
  const { isFirstPage, lastUuid, pageSize, orderKey, orderDirection } =
    pageParam;
  const queryParams = isFirstPage
    ? `isFirstPage=true&pageSize=${pageSize}&orderKey=${orderKey}&orderDirection=${orderDirection}`
    : `isFirstPage=false&lastUuid=${lastUuid}&pageSize=${pageSize}&orderKey=${orderKey}&orderDirection=${orderDirection}`;

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
    queryKey: ['musicians'],
    queryFn: ({ pageParam }) => fetchGetMusicians(pageParam),
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
