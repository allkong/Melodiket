'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import type { TicketBook } from '@/types/ticket';
import SeatSection from './_components/seat-section';
import ConfirmSection from './_components/confirm-section';
import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import SuccessSection from './_components/success-section';

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

  const [step, setStep] = useState<'SEAT' | 'CONFIRM' | 'SUCCESS'>('SEAT');

  return (
    <div className="w-full h-full bg-gray-100">
      {step === 'SEAT' && (
        <SeatSection
          onNext={(data) => {
            setTicketBookInformation((prev) => ({ ...prev, ...data }));
            setStep('CONFIRM');
          }}
        />
      )}
      {step === 'CONFIRM' && (
        <ConfirmSection
          seatRow={ticketBookInformation.seatRow}
          seatCol={ticketBookInformation.seatCol}
          onNext={(favoriteMusician) => {
            /* eslint-disable @typescript-eslint/no-unused-vars */
            const data: TicketBook = {
              ...ticketBookInformation,
              favoriteMusician,
            };
            setStep('SUCCESS');
          }}
        />
      )}
      {step === 'SUCCESS' && (
        <SuccessSection
          seatRow={ticketBookInformation.seatRow}
          seatCol={ticketBookInformation.seatCol}
        />
      )}
    </div>
  );
};

export default Page;
