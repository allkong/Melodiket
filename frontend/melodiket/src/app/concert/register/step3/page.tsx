'use client';

import { useState } from 'react';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

const Step3 = ({ onNext }: { onNext: () => void }) => {
  const [ticketPrice, setTicketPrice] = useState('');

  return (
    <div className="w-full p-4">
      <RegisterLabel
        mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
        subLabel="티켓 정보를 입력해주세요"
      />
      <LargeButton label="다음" onClick={onNext} />
    </div>
  );
};

export default Step3;
