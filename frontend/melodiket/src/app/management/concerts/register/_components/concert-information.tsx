'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import Textarea from '@/components/atoms/textarea/Textarea';
import TextBanner from '@/components/molecules/text/TextBanner';
import FileInput from '@/components/atoms/input/FileInput';
import DateInput from '@/components/atoms/input/DateInput';
import AlertLabel from '@/components/atoms/label/AlertLabel';

import { ConcertData } from '@/types/concert';
import { formatDateCustom } from '@/utils/dayjsPlugin';

interface ConcertInformationProps {
  concertData: ConcertData;
  onNext: (data: ConcertData) => void;
}

const ConcertInformation = ({
  concertData,
  onNext,
}: ConcertInformationProps) => {
  const [title, setTitle] = useState('');
  const [startAt, setStartAt] = useState('');
  const [ticketingAt, setTicketingAt] = useState('');
  const [description, setDescription] = useState('');
  const [posterCid, setPosterCid] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 16);

  const handleStartAtChange = (newStartAt: string) => {
    setStartAt(newStartAt);
    setTicketingAt('');
  };

  const isTicketingDateInvalid = new Date(ticketingAt) >= new Date(startAt);
  const isStartAtDateInvalid = new Date(startAt) <= new Date();
  const isTicketingAtDateInvalid = new Date(ticketingAt) <= new Date();

  const isFormValid =
    title &&
    startAt &&
    ticketingAt &&
    description &&
    posterCid &&
    !isTicketingDateInvalid &&
    !isStartAtDateInvalid &&
    !isTicketingAtDateInvalid;

  const handleNext = () => {
    const updatedConcertData: ConcertData = {
      ...concertData,
      title: title,
      startAt: formatDateCustom(startAt, 'YYYY-MM-DDTHH:mm:ss'),
      ticketingAt: formatDateCustom(ticketingAt, 'YYYY-MM-DDTHH:mm:ss'),
      description: description,
      posterCid: posterCid || '',
    };
    onNext(updatedConcertData);
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex-grow h-0 overflow-y-auto">
        <TextBanner
          title="공연 등록을 위해 공연 정보를 입력해주세요"
          description="기본 정보를 입력해주세요"
        />
        <div className="mt-10 mb-4 flex-grow">
          <h2 className="font-semibold mb-2">공연 이름</h2>
          <Input value={title} onChange={setTitle} placeholder="공연 이름" />
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">공연 일시</h2>
          <DateInput
            value={startAt}
            onChange={handleStartAtChange}
            placeholder="공연 일시"
            minDate={today}
          />
          {isStartAtDateInvalid && (
            <AlertLabel label="공연 일시는 현재 시각 이후로 설정해야 합니다." />
          )}
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">티켓팅 시작 일시</h2>
          <DateInput
            value={ticketingAt}
            onChange={setTicketingAt}
            placeholder="티켓팅 시작 일시"
            minDate={today}
          />
          {isTicketingDateInvalid && (
            <AlertLabel label="티켓팅 시작 일시는 공연 일시보다 빨라야 합니다." />
          )}
          {isTicketingAtDateInvalid && (
            <AlertLabel label="티켓팅 시작 일시는 현재 시각 이후로 설정해야 합니다." />
          )}
        </div>
        <div className="mb-4 flex-grow">
          <h2 className="font-semibold mb-2">공연 내용</h2>
          <Textarea
            value={description}
            onChange={setDescription}
            placeholder="공연 내용"
          />
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">공연 포스터</h2>
          <FileInput onChange={(cid: string | null) => setPosterCid(cid)} />
        </div>
      </div>
      <div className="my-4 h-fit">
        <LargeButton
          label="다음"
          onClick={handleNext}
          disabled={!isFormValid}
        />
      </div>
    </div>
  );
};

export default ConcertInformation;
