'use client';

import { useState, useEffect } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import StageItem from '@/components/molecules/item/StageItem';
import TextBanner from '@/components/molecules/text/TextBanner';

import { ConcertData } from '@/types/concert';
import { useGetMyStages } from '@/services/stage/fetchStage';

interface SelectStageProps {
  concertData: ConcertData;
  onNext: (data: ConcertData) => void;
}

const SelectStage = ({ concertData, onNext }: SelectStageProps) => {
  const [selectedStage, setSelectedStage] = useState<{
    name: string;
    address: string;
    uuid: string;
  } | null>(null);

  const { mutate: getStages, data } = useGetMyStages();

  useEffect(() => {
    getStages();
  }, []);

  const isFormValid = selectedStage !== null;

  const handleStageSelect = (
    stageName: string,
    stageAddress: string,
    stageUuid: string
  ) => {
    setSelectedStage({
      name: stageName,
      address: stageAddress,
      uuid: stageUuid,
    });
  };

  const handleNext = () => {
    const updatedConcertData: ConcertData = {
      ...concertData,
      stageUuid: selectedStage?.uuid || '',
    };
    console.log(updatedConcertData);
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
          {data?.stages?.map((stage) => (
            <StageItem
              key={stage.id}
              title={stage.name}
              content={stage.address}
              onClick={() =>
                handleStageSelect(stage.name, stage.address, stage.uuid)
              }
              isSelected={selectedStage?.uuid === stage.uuid}
              isModify={false}
              isRemove={false}
              uuid={stage.uuid}
            />
          ))}
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
