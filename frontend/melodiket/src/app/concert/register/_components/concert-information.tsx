'use client';

import { useState } from 'react';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';
import Input from '@/components/atoms/input/Input';
import Textarea from '@/components/atoms/textarea/Textarea';

const ConcertInformation = ({ onNext }: { onNext: () => void }) => {
  const [concertDate, setConcertDate] = useState('');
  const [ticketingDate, setTicketingDate] = useState('');
  const [concertContent, setConcertContent] = useState('');

  return (
    <div className="w-full p-4">
      <RegisterLabel
        mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
        subLabel="기본 정보를 입력해주세요"
      />
      <div className="mt-10 mb-4">
        <h2 className="font-semibold mb-2">공연 일시</h2>
        <Input placeholder="공연 일시" />
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">티케팅 시작 일시</h2>
        <Input placeholder="티케팅 시작 일시" />
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">공연 내용</h2>
        <Input placeholder="공연 내용" />
      </div>
      <div className="mb-14">
        <h2 className="font-semibold mb-2">공연 포스터</h2>
        <Input placeholder="공연 포스터" />
      </div>
      <LargeButton label="다음" onClick={onNext} />
    </div>
  );
};

export default ConcertInformation;
