import { useMutation } from '@tanstack/react-query';

import customFetch from '../customFetch';
import { GetMeResponse } from '@/types/user';

const getMe = async () => {
  const response = await customFetch<GetMeResponse>('/users/me', {
    method: 'GET',
  });
  return response;
};

export const useGetMe = () => {
  return useMutation<GetMeResponse, Error>({
    mutationFn: () => getMe(),
    onError: () => {
      alert('정보 가져오기 실패!');
    },
  });
};
