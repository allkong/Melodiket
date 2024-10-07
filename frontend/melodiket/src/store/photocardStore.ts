import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { Sticker, Text } from '@/types/photocard';

interface PhotocardState {
  stickers: Sticker[] | null;
  texts: Text[] | null;

  setStickers: (stickers: Sticker[]) => void;
  setTexts: (texts: Text[]) => void;

  removeSticker: (selectedId: string) => void;
  removeText: (selectedId: string) => void;
}

const usePhotocardStore = create<PhotocardState>()(
  devtools(
    persist(
      (set) => ({
        stickers: null,
        texts: null,

        setStickers: (stickers) => set({ stickers }),
        setTexts: (texts) => set({ texts }),

        removeSticker: (selectedId) =>
          set((state) => ({
            stickers: state.stickers?.filter(
              (sticker) => selectedId !== sticker.id
            ),
          })),
        removeText: (selectedId) =>
          set((state) => ({
            texts: state.texts?.filter((text) => selectedId !== text.id),
          })),
      }),
      {
        name: 'photocard-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

export default usePhotocardStore;
