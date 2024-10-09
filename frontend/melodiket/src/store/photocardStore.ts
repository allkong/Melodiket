import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { SelectSticker, SelectText } from '@/types/photocard';

interface PhotocardState {
  stickers: SelectSticker[] | null;
  texts: SelectText[] | null;

  setStickers: (stickers: SelectSticker[]) => void;
  setTexts: (texts: SelectText[]) => void;

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
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default usePhotocardStore;
