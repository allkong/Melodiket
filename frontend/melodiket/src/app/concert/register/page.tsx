'use client';

import { useState } from 'react';

import Header from '@/components/organisms/navigation/Header';
import Step1 from './step1/page';
import Step2 from './step2/page';
import Step3 from './step3/page';
import Step4 from './step4/page';
import Step5 from './step5/page';

const RegisterConcert = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div>
        {step === 1 && <Step1 onNext={nextStep} />}
        {step === 2 && <Step2 onNext={nextStep} />}
        {step === 3 && <Step3 onNext={nextStep} />}
        {step === 4 && <Step4 onNext={nextStep} />}
        {step === 5 && <Step5 />}
      </div>
    </div>
  );
};

export default RegisterConcert;
