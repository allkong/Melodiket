'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { StageData } from '@/types/stage';
import StageInformation from './_components/stage-information';
import RegisterSuccess from './_components/register-success';
import Header from '@/components/organisms/navigation/Header';

const RegisterConcert = () => {
  const [stageData, setStageData] = useState<StageData>({
    name: '',
    address: '',
    isStanding: true,
    capacity: 0,
    numOfRow: 0,
    numOfCol: 0,
  });
  const [step, setStep] = useState<'STAGE' | 'SUCCESS'>('STAGE');

  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0">
        {step === 'STAGE' && (
          <StageInformation
            stageData={stageData}
            onNext={(data) => {
              setStageData((prev) => ({ ...prev, ...data }));
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
