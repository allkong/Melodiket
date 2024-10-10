import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface PosterState {
  posterCid: string | null;
  signatureImage: string | null;

  setPosterCid: (posterCid: string) => void;
  setSignatureImage: (signatureImage: string) => void;

  clearPosterCid: () => void;
  clearSignatureImage: () => void;
}

const usePosterStore = create<PosterState>()(
  devtools(
    persist(
      (set) => ({
        posterCid: null,
        signatureImage: null,

        setPosterCid: (posterCid) => set({ posterCid }),
        setSignatureImage: (signatureImage) => set({ signatureImage }),

        clearPosterCid: () => set({ posterCid: null }),
        clearSignatureImage: () => set({ signatureImage: null }),
      }),
      {
        name: 'poster-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

export default usePosterStore;
