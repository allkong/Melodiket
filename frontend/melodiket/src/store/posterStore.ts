import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PosterState {
  posterCid: string | null;
  setPosterCid: (posterCid: string) => void;
  clearPosterCid: () => void;
}

const usePosterStore = create<PosterState>()(
  devtools(
    persist(
      (set) => ({
        posterCid: null,

        setPosterCid: (posterCid) => set({ posterCid }),
        clearPosterCid: () => set({ posterCid: null }),
      }),
      {
        name: 'poster-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

export default usePosterStore;
