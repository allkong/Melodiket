import { FAVORITE_TYPES } from '@/constants/favoriteTypes';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SearchItem {
  index: number;
  type: keyof typeof FAVORITE_TYPES;
  label: string;
}

interface MusicianSearchItem extends SearchItem {
  type: 'musician';
}

interface ConcertSearchItem extends SearchItem {
  type: 'concert';
}

interface RecentSearchStore {
  index: number;
  recentMusicianSearchList: MusicianSearchItem[];
  recentConcertSearchList: ConcertSearchItem[];
  addRecentSearchItem: (
    label: string,
    type: keyof typeof FAVORITE_TYPES
  ) => void;
  removeRecentSearchItem: (
    index: number,
    type: keyof typeof FAVORITE_TYPES
  ) => void;
  removeAll: (type: keyof typeof FAVORITE_TYPES) => void;
}

const removeItem = (
  recentSearchList: (MusicianSearchItem | ConcertSearchItem)[],
  index: number
) => {
  return recentSearchList.filter((item) => item.index !== index);
};

const findType = (type: keyof typeof FAVORITE_TYPES) => {
  if (type === 'concert') {
    return 'recentConcertSearchList';
  }
  return 'recentMusicianSearchList';
};

const useRecentSearchStore = create<RecentSearchStore>()(
  persist(
    devtools((set) => ({
      index: 0,
      recentSearchList: [],
      recentMusicianSearchList: [],
      recentConcertSearchList: [],
      addRecentSearchItem: (label: string, type: keyof typeof FAVORITE_TYPES) =>
        set((state) => {
          const value = findType(type);
          const searchList = state[value];

          const find = searchList.find((search) => search.label === label);
          const newItem: SearchItem = { index: state.index, label, type };

          if (find) {
            const removed = removeItem(searchList, find.index);
            return {
              index: state.index + 1,
              [value]: [newItem, ...removed],
            };
          }

          return {
            index: state.index + 1,
            [value]: [newItem, ...state[value]],
          };
        }),
      removeRecentSearchItem: (
        index: number,
        type: keyof typeof FAVORITE_TYPES
      ) =>
        set((state) => {
          const value = findType(type);
          return {
            [value]: removeItem(state[value], index),
          };
        }),
      removeAll: (type: keyof typeof FAVORITE_TYPES) => {
        set(() => {
          const value = findType(type);
          return {
            [value]: [],
          };
        });
      },
    })),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRecentSearchStore;
