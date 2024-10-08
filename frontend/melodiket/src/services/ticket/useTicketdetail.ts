'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import customFetch from '../customFetch';
import { TicketDetail } from '@/types/ticket';
import { useTicketStore } from '@/store/ticketStore';
import { useEffect } from 'react';

const getTicketDetail = async (uuid: string) => {
  const response = await customFetch<TicketDetail>(`/tickets/${uuid}`);
  return response;
};

export const useTicketDetail = () => {
  const params = useParams();
  const uuid = params?.uuid;

  const { setTicketDetail } = useTicketStore();

  const { data, error, isLoading } = useQuery<TicketDetail, Error>({
    queryKey: ['ticketDetail', uuid],
    queryFn: () => getTicketDetail(uuid as string),
    enabled: !!uuid,
  });

  useEffect(() => {
    if (data) {
      setTicketDetail(data);
    }
  }, [data, setTicketDetail]);

  return { data, error, isLoading };
};
