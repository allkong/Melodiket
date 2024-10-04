'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import type { TicketBook } from '@/types/ticket';
import SeatSection from './_components/seat-section';
import ConfirmSection from './_components/confirm-section';
import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import SuccessSection from './_components/success-section';
import useFunnel from '@/hooks/useFunnel';

const Page = () => {
  const params = useParams<{ uuid: string }>();
  const { data } = useFetchConcertDetail(params.uuid);

  const [ticketBookInformation, setTicketBookInformation] =
    useState<TicketBook>({
      concertId: data?.concertId ?? '',
      seatRow: -1,
      seatCol: -1,
      tokenAmount: -1,
      favoriteMusician: '',
    });

  const { Funnel, setStep } = useFunnel<'seat' | 'confirm' | 'success'>(
    true,
    true,
    'seat'
  );

  return (
    <div className="w-full h-full bg-gray-100">
      <Funnel>
        <Funnel.Step step="seat">
          <SeatSection
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
            onNext={(favoriteMusician) => {
              /* eslint-disable @typescript-eslint/no-unused-vars */
              const data: TicketBook = {
                ...ticketBookInformation,
                favoriteMusician,
              };
              setStep('success');
            }}
          />
        </Funnel.Step>
        <Funnel.Step step="success">
          <SuccessSection
            seatRow={ticketBookInformation.seatRow}
            seatCol={ticketBookInformation.seatCol}
          />
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default Page;
