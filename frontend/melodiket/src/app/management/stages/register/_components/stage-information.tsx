'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import Input from '@/components/atoms/input/Input';
import OptionButton from '@/components/atoms/button/OptionButton';

import { StageData } from '@/types/stage';
import {
  useRegisterSeatingStage,
  useRegisterStandingStage,
} from '@/services/stage/fetchStage';

interface StageInformationProps {
  stageData: StageData;
  onNext: (data: StageData) => void;
}

const StageInformation = ({ stageData, onNext }: StageInformationProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isStanding, setIsStanding] = useState(true);
  const [capacity, setCapacity] = useState('');
  const [numOfRow, setNumOfRow] = useState('');
  const [numOfCol, setNumOfCol] = useState('');

  const { mutate: registerStandingStage } = useRegisterStandingStage();
  const { mutate: registerSeatingStage } = useRegisterSeatingStage();

  const isFormValid =
    name && address && (isStanding ? capacity : numOfRow && numOfCol);

  const handleNext = () => {
    if (isStanding) {
      // 스탠딩 스테이지 등록
      registerStandingStage({
        name,
        address,
        capacity: Number(capacity),
      });
    } else {
      // 좌석 스테이지 등록
      registerSeatingStage({
        name,
        address,
        numOfRow: Number(numOfRow),
        numOfCol: Number(numOfCol),
      });
    }
    const updatedStageData: StageData = {
      name,
      address,
      isStanding,
      capacity: isStanding ? Number(capacity) : 0,
      numOfRow: !isStanding ? Number(numOfRow) : 0,
      numOfCol: !isStanding ? Number(numOfCol) : 0,
    };

    onNext(updatedStageData);
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex-grow h-0 overflow-y-auto">
        <TextBanner
          title="공연장 등록을 위해 공연장 정보를 입력해주세요"
          description="기본 정보를 입력해주세요"
        />
        <div className="mt-10 mb-4 flex-grow">
          <h2 className="font-semibold mb-2">공연장 이름</h2>
          <Input value={name} onChange={setName} placeholder="공연장 이름" />
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">공연장 주소</h2>
          <Input
            value={address}
            onChange={setAddress}
            placeholder="공연장 주소"
          />
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">스탠딩 여부</h2>
          <div className="flex gap-2">
            <OptionButton
              label="스탠딩"
              isSelected={isStanding}
              onClick={() => setIsStanding(true)}
            />
            <OptionButton
              label="좌석"
              isSelected={!isStanding}
              onClick={() => setIsStanding(false)}
            />
          </div>
        </div>

        {isStanding ? (
          <div className="mb-4">
            <h2 className="font-semibold mb-2">수용 인원</h2>
            <Input
              value={capacity}
              onChange={setCapacity}
              placeholder="수용 인원"
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="font-semibold mb-2">좌석 행 수</h2>
              <Input
                value={numOfRow}
                onChange={setNumOfRow}
                placeholder="좌석 행 수"
              />
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-2">좌석 열 수</h2>
              <Input
                value={numOfCol}
                onChange={setNumOfCol}
                placeholder="좌석 열 수"
              />
            </div>
          </>
        )}
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

export default StageInformation;
