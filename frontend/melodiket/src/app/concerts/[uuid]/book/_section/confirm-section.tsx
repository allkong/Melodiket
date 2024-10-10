'use client';

import { useParams } from 'next/navigation';

import LargeButton from '@/components/atoms/button/LargeButton';
import Accordion from '@/components/molecules/accordion/Accordion';
import ThinDivider from '@/components/atoms/divider/ThinDivider';
import LabelValueText from '@/components/molecules/text/LabelValutText';
import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import ConfirmCheckbox from '../_components/confirm-checkbox';
import { useState } from 'react';
import LabelCheckbox from '@/components/molecules/checkbox/LabelCheckbox';
import useAuthStore from '@/store/authStore';
import { formatPrice } from '@/utils/concertFormatter';

interface ConfirmSectionProps {
  onNext: (favoriteMusician: string) => void;
  seatRow: number;
  seatCol: number;
}

const ConfirmSection = ({ onNext, seatRow, seatCol }: ConfirmSectionProps) => {
  const params = useParams<{ uuid: string }>();
  const { data: concert } = useFetchConcertDetail(params.uuid);
  const { user } = useAuthStore();

  const [selectedMusician, setSelectedMusician] = useState<string | null>(null);
  const handleSelectMusician = (value: string) => {
    setSelectedMusician(value);
  };

  const [isButtonValid, setIsButtonValid] = useState(false);

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="flex-grow h-0 w-full overflow-y-auto">
        <Accordion label="응원하는 뮤지션" isOpened>
          <div className="space-y-3">
            {concert?.musicians.map((musician) => (
              <LabelCheckbox
                key={musician.musicianUuid}
                label={musician.name}
                isChecked={selectedMusician === musician.musicianUuid}
                onChange={() => handleSelectMusician(musician.musicianUuid)}
              />
            ))}
          </div>
        </Accordion>
        <div className="w-full px-4">
          <ThinDivider />
        </div>
        <Accordion label="공연 정보">
          <div className="space-y-3">
            <LabelValueText label="공연 제목" value={concert?.title} />
            <LabelValueText label="공연 장소" value={concert?.stageName} />
            <LabelValueText label="공연일" value={concert?.startAt} />
          </div>
        </Accordion>
        <div className="w-full px-4">
          <ThinDivider />
        </div>
        <Accordion label="예매 정보">
          <div className="space-y-3">
            <LabelValueText
              label="좌석 형태"
              value={concert?.isStanding ? '스탠딩' : '좌석'}
            />
            {!concert?.isStanding && (
              <LabelValueText
                label="좌석 위치"
                value={`${seatRow}행 ${seatCol}열`}
              />
            )}
            <LabelValueText
              label="가격"
              value={formatPrice(concert?.ticketPrice ?? 0)}
            />
          </div>
        </Accordion>
        <div className="w-full px-4">
          <ThinDivider />
        </div>
        <Accordion label="주문자 확인">
          <div className="space-y-3">
            <LabelValueText
              label="이름"
              value={user?.nickname ?? '로그인이 필요합니다.'}
            />
            <LabelValueText
              label="응원하는 뮤지션"
              value={
                concert?.musicians.find(
                  (musician) => musician.musicianUuid === selectedMusician
                )?.name ?? '선택되지 않았습니다'
              }
            />
          </div>
        </Accordion>
        <div className="w-full px-4">
          <ThinDivider />
        </div>
        <Accordion label="예매자 동의">
          <ConfirmCheckbox onChangeValid={setIsButtonValid} />
        </Accordion>
        <div className="w-full px-4">
          <ThinDivider />
        </div>
      </div>
      <div className="w-full px-6 py-3 bg-white">
        <LargeButton
          label={`${formatPrice(concert?.ticketPrice ?? 0)} 결제`}
          onClick={() => onNext(selectedMusician!)}
          disabled={!isButtonValid || selectedMusician === null}
        />
      </div>
    </div>
  );
};

export default ConfirmSection;
