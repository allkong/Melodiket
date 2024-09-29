'use client';

import { useParams } from 'next/navigation';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import customFetch from '../customFetch';
import { TicketDetail } from '@/types/ticket';
import { useTicketStore } from '@/store/ticketStore';

const getTicketDetail = async (uuid: string) => {
  const response = await customFetch<TicketDetail>(`/tickets/${uuid}`);
  return response;
};

export const useTicketDetail = () => {
  const params = useParams();
  const uuid = params?.uuid;

  const { setTicketDetail } = useTicketStore();

  return useQuery<TicketDetail, Error>({
    queryKey: ['ticketDetail', uuid],
    queryFn: () => getTicketDetail(uuid as string),
    enabled: !!uuid,
    onSuccess: (data: TicketDetail) => {
      setTicketDetail(data);
      console.log(data);
    },
  } as UseQueryOptions<TicketDetail, Error>);
};
