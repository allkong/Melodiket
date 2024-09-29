'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import customFetch from '../customFetch';
import { TicketDetail } from '@/types/ticket';

const getTicketDetail = async (uuid: string) => {
  const response = await customFetch<TicketDetail>(`/tickets/${uuid}`);
  return response;
};

export const useTicketDetail = () => {
  const params = useParams();
  const uuid = params.uuid;

  return useQuery<TicketDetail, Error>({
    queryKey: ['ticketDetail', uuid],
    queryFn: () => getTicketDetail(uuid as string),
    enabled: !!uuid,
  });
};
