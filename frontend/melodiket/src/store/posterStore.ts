import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PosterState {
  posterCid: string | null;
  setPosterCid: (posterCid: string) => void;
  clearPosterCid: () => void;
}

const usePosterStore = create<PosterState>()(
  devtools((set) => ({
    posterCid: null,

    setPosterCid: (posterCid) => set({ posterCid }),
    clearPosterCid: () => set({ posterCid: null }),
  }))
);

export default usePosterStore;
