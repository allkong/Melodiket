import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface WebPushStore {
  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;
}

const useWebPushStore = create<WebPushStore>()(
  persist(
    (set) => ({
      isSubscribed: false,
      setIsSubscribed: (value: boolean) => set({ isSubscribed: value }),
    }),
    {
      name: 'web-push-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWebPushStore;
