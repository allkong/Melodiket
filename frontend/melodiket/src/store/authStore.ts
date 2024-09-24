import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  nickname: string | null;
  role: string | null;
}

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
      getStorage: () => sessionStorage,
    }
  )
);

export default useAuthStore;
