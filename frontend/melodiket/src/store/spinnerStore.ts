import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SpinnerStore {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const useSpinnerStore = create<SpinnerStore>()(
  devtools((set) => ({
    isLoading: false,
    setIsLoading: (value: boolean) => set({ isLoading: value }),
  }))
);

export default useSpinnerStore;
