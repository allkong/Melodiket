'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import MusicianSelectButton from '@/components/molecules/button/MusicianSelectButton';
import TextBanner from '@/components/molecules/text/TextBanner';

import { ConcertData } from '@/types/concert';
import LineDivider from '@/components/atoms/divider/LineDivider';

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
    '정유빈',
  ];

  const filteredMusicians = musicianName
    ? allMusicians.filter((musician) =>
        musician.toLowerCase().includes(musicianName.toLowerCase())
      )
    : [];

  const selectedMusicians = allMusicians.filter(
    (musician) => !!musicianList[musician]
  );
  const unselectedMusicians = allMusicians.filter(
    (musician) => !musicianList[musician]
  );

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow h-0 overflow-y-auto">
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
        <div className="overflow-y-auto">
          {filteredMusicians.length > 0 &&
            filteredMusicians.map((musician) => (
              <MusicianSelectButton
                key={musician}
                label={musician}
                isSelected={!!musicianList[musician]}
                onClick={() => toggleMusician(musician)}
              />
            ))}
          {filteredMusicians.length > 0 && <LineDivider />}
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

export default MusicianInformation;