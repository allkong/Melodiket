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
    onError: () => {
      alert('로그인 실패😥');
    },
  });
};

const isNicknameDuplicated = async (nickname: string) => {
  const response = await customFetch<{ nickname: boolean }>(
    '/auth/nickname/field-duplication-check',
    {
      method: 'post',
      body: {
        nickname,
      },
    }
  );
  return response;
};

export const useIsNicknameDuplicated = () => {
  const mutate = useMutation({
    mutationFn: ({ nickname }: { nickname: string }) =>
      isNicknameDuplicated(nickname),
  });
  return mutate;
};

const isLoginIdDuplicated = async (loginId: string) => {
  const response = await customFetch<{ loginId: boolean }>(
    '/auth/login-id/field-duplication-check',
    {
      method: 'post',
      body: {
        loginId,
      },
    }
  );
  return response;
};

export const useIsLoginIdDuplicated = () => {
  const mutate = useMutation({
    mutationFn: ({ loginId }: { loginId: string }) =>
      isLoginIdDuplicated(loginId),
  });
  return mutate;
};
