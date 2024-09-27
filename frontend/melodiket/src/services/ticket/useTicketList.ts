import { useQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import { Ticket, TicketListResponse } from '@/types/ticket';

const getTicketList = async () => {
  const response = await customFetch<TicketListResponse>('/tickets/me');
  return response;
};

export const useTicketList = () => {
  return useQuery<Ticket[], Error>({
    queryKey: ['ticketList'],
    queryFn: async () => {
      const response = await getTicketList();
      return response.result;
    },
  });
};
