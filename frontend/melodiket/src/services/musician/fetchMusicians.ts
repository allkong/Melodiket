import { useInfiniteQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import { FetchMusiciansResponse, PageParam } from '@/types/musician';

export const fetchGetMusicians = async (
  pageParam: PageParam
): Promise<FetchMusiciansResponse> => {
  const { isFirstPage, lastUuid } = pageParam;
  const queryParams = isFirstPage
    ? `isFirstPage=true&pageSize=5`
    : `isFirstPage=false&lastUuid=${lastUuid}&pageSize=5`;

  const response = await customFetch<FetchMusiciansResponse>(
    `/users/musicians?${queryParams}`
  );
  return response;
};

export const useMusiciansQuery = () => {
  return useInfiniteQuery({
    queryKey: ['musicians'],
    queryFn: ({ pageParam }) => fetchGetMusicians(pageParam),
    initialPageParam: { isFirstPage: true },
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      return pageInfo.hasNextPage
        ? { isFirstPage: false, lastUuid: pageInfo.lastUuid }
        : null;
    },
  });
};
