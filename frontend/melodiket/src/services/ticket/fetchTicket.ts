'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import customFetch from '../customFetch';
import { Ticket, TicketDetail, TicketList } from '@/types/ticket';
import useAuthStore from '@/store/authStore';
import useTicketStore from '@/store/ticketStore';
import ticketKey from './ticketKey';

const getTicketList = async () => {
  return await customFetch<TicketList>('/tickets/me');
};

export const useTicketList = () => {
  const { user } = useAuthStore();

  return useQuery<Ticket[], Error>({
    queryKey: ticketKey.list(user),
    queryFn: async () => {
      const response = await getTicketList();
      return response.result;
    },
    enabled: !!user,
  });
};

const getTicketDetail = async (uuid: string) => {
  const response = await customFetch<TicketDetail>(`/tickets/${uuid}`);
  return response;
};

export const useTicketDetail = () => {
  const params = useParams();
  const uuid = params?.uuid as string;

  const { setTicketDetail } = useTicketStore();

  const { data, error, isLoading } = useQuery<TicketDetail, Error>({
    queryKey: ticketKey.detail(uuid),
    queryFn: () => getTicketDetail(uuid),
    enabled: !!uuid,
  });

  useEffect(() => {
    if (data) {
      setTicketDetail(data);
    }
  }, [data, setTicketDetail]);

  return { data, error, isLoading };
};

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
      toast.error('티켓 사용 실패');
    },
  });
};

const ticketRefund = async (ticketUuid: string) => {
  return await customFetch(`/tickets/${ticketUuid}/refund`, {
    method: 'POST',
  });
};

export const useTicketRefund = () => {
  return useMutation({
    mutationFn: (ticketUuid: string) => ticketRefund(ticketUuid),
    onError: () => {
      toast.error('티켓 환불 실패');
    },
  });
};
