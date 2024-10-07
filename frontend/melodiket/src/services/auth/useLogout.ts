import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/store/authStore';

export const useLogout = () => {
  const router = useRouter();
  const { setAccessToken, setUserInfo } = useAuthStore();

  return useMutation<void, Error>({
    mutationFn: () => {
      setAccessToken('');
      setUserInfo('', '');
      return Promise.resolve(); // 성공적으로 완료된 것으로 간주
    },
    onSuccess: () => {
      router.push('/');
    },
  });
};
