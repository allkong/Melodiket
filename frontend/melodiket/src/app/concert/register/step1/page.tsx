'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/organisms/navigation/Header';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

const Step1 = () => {
  const router = useRouter();
  const [concertDate, setConcertDate] = useState('');
  const [ticketingDate, setTicketingDate] = useState('');
  const [concertContent, setConcertContent] = useState('');
  const [concertPoster, setConcertPoster] = useState<File | null>(null);

  const handleNext = () => {
    router.push('/concert/register/step2');
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <RegisterLabel
          mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
          subLabel="기본 정보를 입력해주세요"
        />
        <LargeButton label="다음" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Step1;
