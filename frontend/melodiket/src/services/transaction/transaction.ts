import { TransactionResponse } from '@/types/transaction';
import customFetch from '../customFetch';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchTransaction = async (options?: {
  isFirstPage?: boolean;
  lastId?: string;
}) => {
  const { isFirstPage = true, lastId } = options ?? {};

  const result = await customFetch<TransactionResponse>(
    `/logs?pageSize=10&orderKey=timestamp&orderDirection=asc&isFirstPage=${isFirstPage}${lastId ? `&lastId=${lastId}` : ''}`
  );
  return result;
};

export const useFetchTransaction = () => {
  const result = useInfiniteQuery({
    queryKey: ['transaction'],
    queryFn: ({ pageParam }) => fetchTransaction(pageParam),
    initialPageParam: { isFirstPage: true },
    getNextPageParam: (lastPage) => {
      return {
        isFirstPage: false,
        lastId: lastPage.pageInfo.lastId,
      };
    },
  });
  return result;
};
