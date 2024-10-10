import { TransactionResponse } from '@/types/transaction';
import customFetch from '../customFetch';
import { useQuery } from '@tanstack/react-query';

const fetchTransaction = async (pageSize: number = 100) => {
  const result = await customFetch<TransactionResponse[]>(
    `/logs?pageSize=${pageSize}`
  );
  return result;
};

export const useFetchTransaction = (pageSize?: number) => {
  const result = useQuery({
    queryKey: ['transaction'],
    queryFn: () => fetchTransaction(pageSize),
    gcTime: 0,
  });
  return result;
};
