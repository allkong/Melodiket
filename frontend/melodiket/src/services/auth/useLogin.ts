import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import type { LoginRequest, LoginResponse } from '@/types/login';
import type { SignUpData } from '@/types/signUp';

import useAuthStore from '@/store/authStore';
import customFetch from '../customFetch';

const login = async (loginData: LoginRequest) => {
  return await customFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: loginData,
  });
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
      toast.error('로그인 실패😥');
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
    throwOnError: true,
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
    throwOnError: true,
  });
  return mutate;
};

const signUp = async (body: SignUpData) => {
  const { role, ...requestBody } = body;
  const url = `/auth/sign-up/${role}`;
  const response = await customFetch(url, {
    body: requestBody,
    method: 'post',
  });
  return response;
};

export const useSignUp = () => {
  const mutate = useMutation({
    mutationFn: ({ body }: { body: SignUpData }) => signUp(body),
    throwOnError: true,
  });
  return mutate;
};
