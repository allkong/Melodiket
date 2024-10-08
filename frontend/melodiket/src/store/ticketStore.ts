import { TicketDetail } from '@/types/ticket';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TicketState {
  ticketDetail: TicketDetail | null;
  setTicketDetail: (ticket: TicketDetail) => void;
  clearTicketDetail: () => void;
}

export const useTicketStore = create<TicketState>()(
  devtools(
    persist(
      (set) => ({
        ticketDetail: null,

        setTicketDetail: (ticketDetail) => set({ ticketDetail }),
        clearTicketDetail: () => set({ ticketDetail: null }),
      }),
      {
        name: 'ticket-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

export default useTicketStore;
