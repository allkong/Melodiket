'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/organisms/navigation/Header';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

const Step3 = () => {
  const router = useRouter();
  const [ticketPrice, setTicketPrice] = useState('');
  const [revenueDistribution, setRevenueDistribution] = useState('');

  const handleNext = () => {
    router.push('/concert/register/step4');
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <RegisterLabel
          mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
          subLabel="티켓 정보를 입력해주세요"
        />
        <LargeButton label="다음" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Step3;
