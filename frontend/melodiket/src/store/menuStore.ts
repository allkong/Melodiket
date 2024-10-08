import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MenuStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const useMenuStore = create<MenuStore>()(
  devtools((set) => ({
    isOpen: false,
    setIsOpen: (value: boolean) => set({ isOpen: value }),
  }))
);

export default useMenuStore;
