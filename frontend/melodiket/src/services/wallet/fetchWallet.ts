import { GetMyWalletResponse } from '@/types/wallet';
import customFetch from '../customFetch';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const getMyWallet = async () => {
  const response = await customFetch<GetMyWalletResponse>('/users/me/wallet', {
    method: 'GET',
  });
  return response;
};

export const useGetMyWallet = () => {
  return useMutation<GetMyWalletResponse, Error>({
    mutationFn: () => getMyWallet(),
    onError: () => {
      toast.error('지갑 정보 가져오기 실패!');
    },
  });
};

const concertClose = async (id: string): Promise<void> => {
  await customFetch(`/concerts/${id}/close`, {
    method: 'POST',
  });
};

export const useConcertClose = () => {
  return useMutation({
    mutationFn: (id: string) => concertClose(id),
    onError: () => {
      toast.error('공연 정산 실패!');
    },
  });
};
