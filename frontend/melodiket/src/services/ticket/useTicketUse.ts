import { useMutation } from '@tanstack/react-query';
import customFetch from '../customFetch';

const ticketUse = async (ticketUuid: string) => {
  const response = await customFetch(`/tickets/${ticketUuid}/use`, {
    method: 'POST',
  });

  return response;
};

export const useTicketUse = () => {
  return useMutation({
    mutationFn: (ticketUuid: string) => ticketUse(ticketUuid),
    onError: () => {
      alert('티켓 사용 실패😥');
    },
  });
};
