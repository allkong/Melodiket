'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import Textarea from '@/components/atoms/textarea/Textarea';
import TextBanner from '@/components/molecules/text/TextBanner';

import { ConcertData } from '@/types/concert';
import FileInput from '@/components/atoms/input/FileInput';
import DateInput from '@/components/atoms/input/DateInput';

interface ConcertInformationProps {
  concertData: ConcertData;
  onNext: (data: ConcertData) => void;
}

const ConcertInformation = ({
  concertData,
  onNext,
}: ConcertInformationProps) => {
  const [concertName, setConcertName] = useState('');
  const [startAt, setStartAt] = useState('');
  const [ticketingAt, setTicketingAt] = useState('');
  const [concertDescription, setConcertDescription] = useState('');
  const [concertPoster, setConcertPoster] = useState<File | null>();

  const isFormValid =
    concertName &&
    startAt &&
    ticketingAt &&
    concertDescription &&
    concertPoster;

  const handleNext = () => {
    const updatedConcertData: ConcertData = {
      ...concertData,
      concertName: concertName,
      startAt: new Date(),
      ticketingAt: new Date(),
      concertDescription: concertDescription,
      concertPoster: concertPoster as File,
    };
    onNext(updatedConcertData);
  };

  return (
    <div className="w-full p-4">
      <TextBanner
        title="공연 등록을 위해 공연 정보를 입력해주세요"
        description="기본 정보를 입력해주세요"
      />
      <div className="mt-10 mb-4">
        <h2 className="font-semibold mb-2">공연 이름</h2>
        <Input
          value={concertName}
          onChange={setConcertName}
          placeholder="공연 이름"
        />
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">공연 일시</h2>
        <DateInput
          value={startAt}
          onChange={setStartAt}
          placeholder="공연 일시"
        />
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">티케팅 시작 일시</h2>
        <DateInput
          value={ticketingAt}
          onChange={setTicketingAt}
          placeholder="티케팅 시작 일시"
        />
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">공연 내용</h2>
        <Textarea
          value={concertDescription}
          onChange={setConcertDescription}
          placeholder="공연 내용"
        />
      </div>
      <div className="mb-14">
        <h2 className="font-semibold mb-2">공연 포스터</h2>
        <FileInput onChange={setConcertPoster} />
      </div>
      <LargeButton label="다음" onClick={handleNext} disabled={!isFormValid} />
    </div>
  );
};

export default ConcertInformation;
