'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import type { TicketBook } from '@/types/ticket';
import SeatSection from './_components/SeatSection';
import ConfirmSection from './_components/ConfirmSection';
import { useFetchConcertDetail } from '@/services/concert/fetchConcert';

const Page = () => {
  const router = useRouter();
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
          onNext={(favoriteMusician) => {
            const data: TicketBook = {
              ...ticketBookInformation,
              favoriteMusician,
            };
          }}
        />
      )}
    </div>
  );
};

export default Page;
