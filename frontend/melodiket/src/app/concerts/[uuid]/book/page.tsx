'use client';

import { useState } from 'react';
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

const Page = () => {
  const params = useParams<{ uuid: string }>();
  const { data } = useFetchConcertDetail(params.uuid);
  const { result } = data ?? {};

  const [ticketBookInformation, setTicketBookInformation] =
    useState<TicketBookRequest>({
      concertId: result?.concertUuid ?? '',
      seatRow: -1,
      seatCol: -1,
      favoriteMusician: '',
    });

  const { Funnel, setStep } = useFunnel<'seat' | 'confirm' | 'success'>(
    true,
    true,
    'seat'
  );

  const mutate = useBookTicket();
  const [bookResult, setBookResult] = useState<TicketBookResponse | null>(null);

  return (
    <div className="w-full h-full bg-gray-100">
      <Funnel>
        <Funnel.Step step="seat">
          <SeatSection
            price={data?.result.ticketPrice ?? 0}
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
              };

              const result = await mutate.mutateAsync({
                ticketBookRequest: data,
              });
              setBookResult(result);
              setStep('success');
            }}
          />
        </Funnel.Step>
        <Funnel.Step step="success">
          <SuccessSection bookResult={bookResult} />
        </Funnel.Step>
      </Funnel>
    </div>
  );
};

export default Page;
