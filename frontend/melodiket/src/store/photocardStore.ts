import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
  devtools((set) => ({
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
  }))
);

export default usePhotocardStore;
