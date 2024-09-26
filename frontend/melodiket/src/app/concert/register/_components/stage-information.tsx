'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import StageItem from '@/components/molecules/item/StageItem';
import TextBanner from '@/components/molecules/text/TextBanner';

import { ConcertData } from '@/types/concert';

interface SelectStageProps {
  concertData: ConcertData;
  onNext: (data: ConcertData) => void;
}

const SelectStage = ({ concertData, onNext }: SelectStageProps) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const isFormValid = selectedStage !== null;

  const handleStageSelect = (stageName: string) => {
    setSelectedStage(stageName);
  };

  const handleNext = () => {
    const updatedConcertData: ConcertData = {
      ...concertData,
      stageInformation: {
        ...concertData.stageInformation,
        stageName: selectedStage || '',
        stageAddress: '서울특별시 구로구 경인로 430',
      },
    };
    onNext(updatedConcertData);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow h-0 overflow-y-auto">
        <TextBanner
          title="공연 등록을 위해 공연 정보를 입력해주세요"
          description="공연장을 선택해주세요"
        />
        <div className="mt-10 mb-4">
          <StageItem
            title="고척 스카이돔"
            content="서울특별시 구로구 경인로 430"
            onClick={() => handleStageSelect('고척 스카이돔')}
            isSelected={selectedStage === '고척 스카이돔'}
          />
          <StageItem
            title="잠실 종합운동장"
            content="서울특별시 송파구 올림픽로 25"
            onClick={() => handleStageSelect('잠실 종합운동장')}
            isSelected={selectedStage === '잠실 종합운동장'}
          />
          <StageItem
            title="올림픽공원 체조경기장"
            content="서울특별시 송파구 방이동 올림픽로 424"
            onClick={() => handleStageSelect('올림픽공원 체조경기장')}
            isSelected={selectedStage === '올림픽공원 체조경기장'}
          />
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

export default SelectStage;
