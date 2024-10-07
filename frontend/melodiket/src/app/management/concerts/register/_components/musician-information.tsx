'use client';

import { useState, useEffect, useRef } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import MusicianSelectButton from '@/components/molecules/button/MusicianSelectButton';
import TextBanner from '@/components/molecules/text/TextBanner';

import { ConcertData } from '@/types/concert';
import LineDivider from '@/components/atoms/divider/LineDivider';
import { useMusiciansQuery } from '@/services/musician/fetchMusicians';

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMusiciansQuery();

  const endRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false); // 스크롤이 여러 번 호출되는 것을 방지하기 위한 플래그

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (endRef.current) {
      observer.observe(endRef.current);
    }

    return () => {
      if (endRef.current) {
        observer.unobserve(endRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

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

  const allMusicians = data?.pages.flatMap((page) => page.result) || [];

  const filteredMusicians =
    musicianName.trim().length > 0
      ? allMusicians.filter((musician) =>
          musician.nickname.toLowerCase().includes(musicianName.toLowerCase())
        )
      : [];

  const selectedMusicians = allMusicians.filter(
    (musician) => !!musicianList[musician.nickname]
  );
  const unselectedMusicians = allMusicians.filter(
    (musician) => !musicianList[musician.nickname]
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
                key={musician.uuid}
                label={musician.nickname}
                isSelected={!!musicianList[musician.nickname]}
                onClick={() => toggleMusician(musician.nickname)}
              />
            ))}
          {filteredMusicians.length > 0 && <LineDivider />}
          {selectedMusicians.map((musician) => (
            <MusicianSelectButton
              key={musician.uuid}
              label={musician.nickname}
              isSelected={!!musicianList[musician.nickname]}
              onClick={() => toggleMusician(musician.nickname)}
            />
          ))}
          {unselectedMusicians.map((musician) => (
            <MusicianSelectButton
              key={musician.uuid}
              label={musician.nickname}
              isSelected={!!musicianList[musician.nickname]}
              onClick={() => toggleMusician(musician.nickname)}
            />
          ))}
          <div ref={endRef} className="h-10" />
          {isFetchingNextPage && <p>Loading more...</p>}
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
