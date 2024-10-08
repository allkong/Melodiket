import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import customFetch from '../customFetch';
import useAuthStore from '@/store/authStore';

const logout = async () => {
  return await customFetch('/auth/logout', {
    method: 'POST',
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  return async () => {
    try {
      await logout();
      clearAuth();
      sessionStorage.clear();
      router.push('/');
    } catch (error) {
      toast.error('로그아웃 실패');
    }
  };
};
