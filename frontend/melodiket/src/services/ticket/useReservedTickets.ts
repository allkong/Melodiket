import { useQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import { Ticket, TicketsResponse } from '@/types/ticket';

const getReservedTickets = async () => {
  const response = await customFetch<TicketsResponse>('/concerts/tickets/me');
  return response;
};

export const useReservedTickets = () => {
  return useQuery<Ticket[], Error>({
    queryKey: ['ticketList'],
    queryFn: async () => {
      const response = await getReservedTickets();
      return response.result;
    },
  });
};
