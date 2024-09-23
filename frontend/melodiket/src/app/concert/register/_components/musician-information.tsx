'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import MusicianSelectButton from '@/components/molecules/button/MusicianSelectButton';
import TextBanner from '@/components/molecules/text/TextBanner';

import { ConcertData } from '@/types/concert';

interface MusicianInformationProps {
  concertData: ConcertData;
  onNext: (data: ConcertData) => void;
}

const MusicianInformation = ({
  concertData,
  onNext,
}: MusicianInformationProps) => {
  const [musicianList, setMusicianList] = useState<{ [key: string]: string }>(
    {}
  );
  const [musicianName, setMusicianName] = useState('');

  const isFormValid = Object.keys(musicianList).length > 0;

  const toggleMusician = (name: string) => {
    setMusicianList((prev) => {
      const updatedList = { ...prev };
      if (updatedList[name]) {
        delete updatedList[name];
      } else {
        updatedList[name] = name;
      }
      return updatedList;
    });
  };

  const handleNext = () => {
    const updatedConcertData: ConcertData = {
      ...concertData,
      musicianList: musicianList,
    };
    onNext(updatedConcertData);
  };

  const allMusicians = [
    '주나주나',
    '정다빈밴드',
    '잔나비',
    '이디어츠',
    '박유빈',
  ];

  const selectedMusicians = allMusicians.filter(
    (musician) => !!musicianList[musician]
  );
  const unselectedMusicians = allMusicians.filter(
    (musician) => !musicianList[musician]
  );

  return (
    <div className="w-full p-4">
      <TextBanner
        title="공연 등록을 위해 공연 정보를 입력해주세요"
        description="뮤지션을 선택해주세요"
      />
      <div className="mt-10 mb-4">
        <Input
          placeholder="뮤지션 이름 입력"
          value={musicianName}
          onChange={setMusicianName}
        />
      </div>
      <div className="my-4">
        {selectedMusicians.map((musician) => (
          <MusicianSelectButton
            key={musician}
            label={musician}
            isSelected={!!musicianList[musician]}
            onClick={() => toggleMusician(musician)}
          />
        ))}
        {unselectedMusicians.map((musician) => (
          <MusicianSelectButton
            key={musician}
            label={musician}
            isSelected={!!musicianList[musician]}
            onClick={() => toggleMusician(musician)}
          />
        ))}
      </div>
      <LargeButton label="다음" onClick={handleNext} disabled={!isFormValid} />
    </div>
  );
};

export default MusicianInformation;
