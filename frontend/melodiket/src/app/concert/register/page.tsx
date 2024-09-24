'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { ConcertData } from '@/types/concert';
import ConcertInformation from './_components/concert-information';
import MusicianInformation from './_components/musician-information';
import TicketInformation from './_components/ticket-information';
import StageInformation from './_components/stage-information';
import RegisterSuccess from './_components/register-success';
import Header from '@/components/organisms/navigation/Header';

const RegisterConcert = () => {
  const [concertData, setConcertData] = useState<ConcertData>({
    concertName: '',
    startAt: new Date(),
    ticketingAt: new Date(),
    concertDescription: '',
    concertPoster: new File([], ''),
    musicianList: {},
    ticketPrice: 0,
    ownerStake: 0,
    musicianStake: 0,
    favoriteMusicianStake: 0,
    stageInformation: {
      stageName: '',
      stageAddress: '',
      isStanding: true,
      capacity: undefined,
      numOfRow: undefined,
      numOfCol: undefined,
    },
  });
  const [step, setStep] = useState<
    'CONCERT' | 'MUSICIAN' | 'TICKET' | 'STAGE' | 'SUCCESS'
  >('CONCERT');

  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0">
        {step === 'CONCERT' && (
          <ConcertInformation
            concertData={concertData}
            onNext={(data) => {
              setConcertData((prev) => ({ ...prev, ...data }));
              setStep('MUSICIAN');
            }}
          />
        )}
        {step === 'MUSICIAN' && (
          <MusicianInformation
            concertData={concertData}
            onNext={(data) => {
              setConcertData((prev) => ({ ...prev, ...data }));
              setStep('TICKET');
            }}
          />
        )}
        {step === 'TICKET' && (
          <TicketInformation
            concertData={concertData}
            onNext={(data) => {
              setConcertData((prev) => ({ ...prev, ...data }));
              setStep('STAGE');
            }}
          />
        )}
        {step === 'STAGE' && (
          <StageInformation
            concertData={concertData}
            onNext={(data) => {
              setConcertData((prev) => ({ ...prev, ...data }));
              console.log(concertData);
              setStep('SUCCESS');
            }}
          />
        )}
        {step === 'SUCCESS' && (
          <RegisterSuccess
            onNext={() => {
              router.push('/');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterConcert;
