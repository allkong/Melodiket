import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RegisterStageState {
  stageName: string;
  setStageName: (newValue: string) => void;
  stageAddress: string;
  setStageAddress: (newValue: string) => void;
  isStanding: boolean;
  setIsStanding: (newValue: boolean) => void;
  capacity?: number; // isStanding이 true일 때 사용
  setCapacity: (newValue: number) => void;
  numOfRow?: number; // isStanding이 false일 때 사용
  setnumOfRow: (newValue: number) => void;
  numOfCol?: number; // isStanding이 false일 때 사용
  setnumOfCol: (newValue: number) => void;
}

const useStore = create<RegisterStageState>()(
  devtools((set, get) => ({
    stageName: '',
    setStageName: (newValue) => set({ stageName: newValue }),
    stageAddress: '',
    setStageAddress: (newValue) => set({ stageAddress: newValue }),
    isStanding: true, // 기본값 true
    setIsStanding: (newValue) =>
      set({
        isStanding: newValue,
        capacity: newValue ? get().capacity : undefined, // isStanding이 true일 때 capacity 사용
        numOfRow: !newValue ? get().numOfRow : undefined, // isStanding이 false일 때 numOfRow 사용
        numOfCol: !newValue ? get().numOfCol : undefined, // isStanding이 false일 때 numOfCol 사용
      }),
    capacity: undefined,
    setCapacity: (newValue) =>
      set((state) => ({
        capacity: state.isStanding ? newValue : undefined, // isStanding이 true일 때만 capacity 설정
      })),
    numOfRow: undefined, // 좌석형일 때만 사용
    setnumOfRow: (newValue) =>
      set((state) => ({
        numOfRow: !state.isStanding ? newValue : undefined, // isStanding이 false일 때만 사용
      })),
    numOfCol: undefined, // 좌석형일 때만 사용
    setnumOfCol: (newValue) =>
      set((state) => ({
        numOfCol: !state.isStanding ? newValue : undefined, // isStanding이 false일 때만 사용
      })),
  }))
);

export default useStore;
