import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface SearchItem {
  index: number;
  label: string;
}

interface RecentSearchStore {
  index: number;
  recentSearchList: SearchItem[];
  addRecentSearchItem: (label: string) => void;
  removeRecentSearchItem: (index: number) => void;
  removeAll: () => void;
}

const removeItem = (recentSearchList: SearchItem[], index: number) => {
  return recentSearchList.filter((item) => item.index !== index);
};

const useRecentSearchStore = create<RecentSearchStore>()(
  persist(
    devtools((set) => ({
      index: 0,
      recentSearchList: [],
      addRecentSearchItem: (label: string) =>
        set((state) => {
          const find = state.recentSearchList.find(
            (search) => search.label === label
          );

          const newItem: SearchItem = { index: state.index, label };

          if (find) {
            const removed = removeItem(state.recentSearchList, find.index);
            return {
              index: state.index + 1,
              recentSearchList: [newItem, ...removed],
            };
          }

          return {
            index: state.index + 1,
            recentSearchList: [newItem, ...state.recentSearchList],
          };
        }),
      removeRecentSearchItem: (index: number) =>
        set((state) => {
          return {
            recentSearchList: removeItem(state.recentSearchList, index),
          };
        }),
      removeAll: () => set({ recentSearchList: [], index: 0 }),
    })),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRecentSearchStore;
