import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type { LoginRequest, LoginResponse } from '@/types/login';

import useAuthStore from '@/store/authStore';
import customFetch from '../customFetch';

const login = async (loginData: LoginRequest) => {
  const response = await customFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: loginData,
  });

  return response;
};

export const useLogin = () => {
  const router = useRouter();
  const { setAccessToken, setUserInfo } = useAuthStore();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (loginData: LoginRequest) => login(loginData),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUserInfo(data.nickname, data.role);
      router.push('/');
    },
    onError: (error: Error) => {
      alert('로그인 실패😥');
    },
  });
};