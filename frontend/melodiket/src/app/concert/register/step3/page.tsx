'use client';

import { useState } from 'react';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';
import Input from '@/components/atoms/input/Input';

const Step3 = ({ onNext }: { onNext: () => void }) => {
  const [ticketPrice, setTicketPrice] = useState('');

  return (
    <div className="w-full p-4">
      <RegisterLabel
        mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
        subLabel="티켓 정보를 입력해주세요"
      />
      <div className="mt-10 mb-4">
        <h2 className="font-semibold mb-2">티켓 가격</h2>
        <Input placeholder="티켓 가격" />
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">수익 분배</h2>
        <Input placeholder="공연장" />
        <Input placeholder="뮤지션" />
        <Input placeholder="추가 비율" />
      </div>
      <LargeButton label="다음" onClick={onNext} />
    </div>
  );
};

export default Step3;
