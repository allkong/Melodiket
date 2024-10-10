'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import type { TicketBookRequest, TicketBookResponse } from '@/types/ticket';
import SeatSection from './_section/seat-section';
import ConfirmSection from './_section/confirm-section';
import {
  useBookTicket,
  useFetchConcertDetail,
} from '@/services/concert/fetchConcert';
import SuccessSection from './_section/success-section';
import useFunnel from '@/hooks/useFunnel';
import useSpinner from '@/hooks/useSpinner';

const Page = () => {
  const params = useParams<{ uuid: string }>();
  const { data: concert } = useFetchConcertDetail(params.uuid);

  const [ticketBookInformation, setTicketBookInformation] =
    useState<TicketBookRequest>({
      concertId: '',
      seatRow: -1,
      seatCol: -1,
      favoriteMusician: '',
    });

  const { Funnel, setStep } = useFunnel<'seat' | 'confirm' | 'success'>();

  const mutate = useBookTicket();
  useSpinner(mutate.isPending);

  useEffect(() => {
    if (concert?.isStanding) {
      setStep('confirm');
    }
  }, [concert, setStep]);

  return (
    <div className="w-full h-full bg-gray-100">
      <Funnel>
        <Funnel.Step step="seat">
          <SeatSection
            price={concert?.ticketPrice ?? 0}
            onNext={(data) => {
              setTicketBookInformation((prev) => ({ ...prev, ...data }));
              setStep('confirm');
            }}
          />
        </Funnel.Step>
        <Funnel.Step step="confirm">
          <ConfirmSection
            seatRow={ticketBookInformation.seatRow}
            seatCol={ticketBookInformation.seatCol}
            onNext={async (favoriteMusician) => {
              const data: TicketBookRequest = {
                ...ticketBookInformation,
                favoriteMusician,
                concertId: concert?.concertUuid ?? '',
              };

              const result = await mutate.mutateAsync({
                ticketBookRequest: data,
              });

              setStep('success');
            }}
          />
        </Funnel.Step>
        <Funnel.Step step="success">
          <SuccessSection
            row={ticketBookInformation.seatRow}
            col={ticketBookInformation.seatCol}
          />
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default Page;
