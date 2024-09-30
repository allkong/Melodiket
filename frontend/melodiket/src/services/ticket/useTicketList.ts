import { useQuery } from '@tanstack/react-query';
import customFetch from '../customFetch';
import { Ticket, TicketList } from '@/types/ticket';

const getTicketList = async () => {
  const response = await customFetch<TicketList>('/tickets/me');
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
