import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { StageData } from '@/types/stage';

interface RegisterConcertState {
  concertName: string;
  setConcertName: (newValue: string) => void;
  startAt: Date;
  setStartAt: (newValue: Date) => void;
  ticketingAt: Date;
  setTicketingAt: (newValue: Date) => void;
  concertDescription: string;
  setConcertDescription: (newValue: string) => void;
  concertPoster: File;
  setConcertPoster: (newValue: File) => void;
  musicianList: { [key: string]: string };
  setMusicianList: (newValue: { [key: string]: string }) => void;
  ticketPrice: number;
  setTicketPrice: (newValue: number) => void;
  ownerStake: number;
  setOwnerStake: (newValue: number) => void;
  musicianStake: number;
  setMusicianStake: (newValue: number) => void;
  favoriteMusicianStake: number;
  setFavoriteMusicianStake: (newValue: number) => void;
  stageInformation: StageData;
  reset: () => void;
}

const useRegisterConcertStore = create<RegisterConcertState>()(
  devtools((set) => ({
    concertName: '',
    setConcertName: (newValue: string) => set({ concertName: newValue }),
    startAt: new Date(),
    setStartAt: (newValue: Date) => set({ startAt: newValue }),
    ticketingAt: new Date(),
    setTicketingAt: (newValue: Date) => set({ ticketingAt: newValue }),
    concertDescription: '',
    setConcertDescription: (newValue: string) =>
      set({ concertDescription: newValue }),
    concertPoster: new File([], ''), // 초기값은 빈 파일
    setConcertPoster: (newValue: File) => set({ concertPoster: newValue }),
    musicianList: {},
    setMusicianList: (newValue: { [key: string]: string }) =>
      set({ musicianList: newValue }),
    ticketPrice: 0,
    setTicketPrice: (newValue: number) => set({ ticketPrice: newValue }),
    ownerStake: 0,
    setOwnerStake: (newValue: number) => set({ ownerStake: newValue }),
    musicianStake: 0,
    setMusicianStake: (newValue: number) => set({ musicianStake: newValue }),
    favoriteMusicianStake: 0,
    setFavoriteMusicianStake: (newValue: number) =>
      set({ favoriteMusicianStake: newValue }),
    stageInformation: {
      stageName: '',
      stageAddress: '',
      isStanding: true,
      capacity: undefined,
      numOfRow: undefined,
      numOfCol: undefined,
    },
    reset: () =>
      set({
        concertName: '',
        startAt: new Date(),
        ticketingAt: new Date(),
        concertDescription: '',
        concertPoster: new File([], ''),
        musicianList: {},
        ticketPrice: 0,
        ownerStake: 0,
        musicianStake: 0,
        favoriteMusicianStake: 0,
        stageInformation: {
          stageName: '',
          stageAddress: '',
          isStanding: true,
          capacity: undefined,
          numOfRow: undefined,
          numOfCol: undefined,
        },
      }),
  }))
);

export default useRegisterConcertStore;
