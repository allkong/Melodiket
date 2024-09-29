import { TicketDetail } from '@/types/ticket';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TicketState {
  ticket: TicketDetail | null;
  setTicketDetail: (ticket: TicketDetail) => void;
  clearTicketDetail: () => void;
}

export const useTicketStore = create<TicketState>()(
  devtools((set) => ({
    ticket: null,

    setTicketDetail: (ticket) => set({ ticket }),
    clearTicketDetail: () => set({ ticket: null }),
  }))
);

export default useTicketStore;
