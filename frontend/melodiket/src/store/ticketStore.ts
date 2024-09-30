import { TicketDetail } from '@/types/ticket';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TicketState {
  ticketDetail: TicketDetail | null;
  setTicketDetail: (ticket: TicketDetail) => void;
  clearTicketDetail: () => void;
}

export const useTicketStore = create<TicketState>()(
  devtools((set) => ({
    ticketDetail: null,

    setTicketDetail: (ticketDetail) => set({ ticketDetail }),
    clearTicketDetail: () => set({ ticketDetail: null }),
  }))
);

export default useTicketStore;
