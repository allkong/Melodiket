import { useMutation } from '@tanstack/react-query';
import { login, LoginRequest } from '@/api/auth';
import useAuthStore from '@/store/authStore';

export const useLogin = () => {
  const { setAccessToken, setUserInfo } = useAuthStore();

  return useMutation((loginData: LoginRequest) => login(loginData), {
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUserInfo(data.nickname, data.role);
    },
    onError: (error: unknown) => {
      console.error('Login failed:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
