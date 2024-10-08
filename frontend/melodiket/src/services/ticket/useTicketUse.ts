import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
      toast.error('티켓 사용 실패😥');
    },
  });
};
