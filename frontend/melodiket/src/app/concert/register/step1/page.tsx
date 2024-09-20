'use client';

import { useState } from 'react';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

const Step1 = ({ onNext }: { onNext: () => void }) => {
  const [concertDate, setConcertDate] = useState('');
  const [ticketingDate, setTicketingDate] = useState('');
  const [concertContent, setConcertContent] = useState('');
  const [concertPoster, setConcertPoster] = useState<File | null>(null);

  return (
    <div className="w-full p-4">
      <RegisterLabel
        mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
        subLabel="기본 정보를 입력해주세요"
      />
      <LargeButton label="다음" onClick={onNext} />
    </div>
  );
};

export default Step1;
