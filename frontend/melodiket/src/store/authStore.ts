import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/user';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string) => void;
  setUserInfo: (nickname: string, role: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    devtools((set) => ({
      accessToken: null,
      user: null,

      setAccessToken: (token: string) => set({ accessToken: token }),
      setUserInfo: (nickname: string, role: string) =>
        set({ user: { nickname, role } }),
      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
        }),
    })),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
