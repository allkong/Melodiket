import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { SelectSticker, SelectText } from '@/types/photocard';

interface PhotocardState {
  stickers: SelectSticker[] | null;
  texts: SelectText[] | null;

  setStickers: (stickers: SelectSticker[]) => void;
  addSticker: (sticker: SelectSticker) => void;
  removeSticker: (selectedId: string) => void;
  clearStickers: () => void;

  setTexts: (texts: SelectText[]) => void;
  removeText: (selectedId: string) => void;
}

const usePhotocardStore = create<PhotocardState>()(
  devtools(
    persist(
      (set) => ({
        stickers: null,
        texts: null,

        setStickers: (stickers) => set({ stickers }),
        addSticker: (sticker) =>
          set((state) => ({
            stickers: state.stickers ? [...state.stickers, sticker] : [sticker],
          })),
        removeSticker: (selectedId) =>
          set((state) => ({
            stickers: state.stickers?.filter(
              (sticker) => selectedId !== sticker.id
            ),
          })),
        clearStickers: () => set({ stickers: null }),

        setTexts: (texts) => set({ texts }),
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
