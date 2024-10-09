'use client';

import { useState, useEffect, useRef } from 'react';

import { useMusiciansQuery } from '@/services/musician/fetchMusician';
import { ConcertData } from '@/types/concert';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import MusicianSelectButton from '@/components/molecules/button/MusicianSelectButton';
import TextBanner from '@/components/molecules/text/TextBanner';

import LineDivider from '@/components/atoms/divider/LineDivider';

interface MusicianInformationProps {
  concertData: ConcertData;
  onNext: (data: ConcertData) => void;
}

const MusicianInformation = ({
  concertData,
  onNext,
}: MusicianInformationProps) => {
  const [musicianList, setMusicianList] = useState<string[]>([]);
  const [musicianName, setMusicianName] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMusiciansQuery();

  const endRef = useRef<HTMLDivElement>(null);

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

  const isFormValid = musicianList.length > 0;

  const toggleMusician = (uuid: string) => {
    setMusicianList((prev) => {
      if (prev.includes(uuid)) {
        return prev.filter((id) => id !== uuid);
      } else {
        return [...prev, uuid];
      }
    });
  };

  const handleNext = () => {
    const updatedConcertData: ConcertData = {
      ...concertData,
      musicians: musicianList,
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

  const selectedMusicians = allMusicians.filter((musician) =>
    musicianList.includes(musician.uuid)
  );
  const unselectedMusicians = allMusicians.filter(
    (musician) => !musicianList.includes(musician.uuid)
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
                isSelected={musicianList.includes(musician.uuid)}
                onClick={() => toggleMusician(musician.uuid)}
              />
            ))}
          {filteredMusicians.length > 0 && <LineDivider />}
          {selectedMusicians.map((musician) => (
            <MusicianSelectButton
              key={musician.uuid}
              label={musician.nickname}
              isSelected={musicianList.includes(musician.uuid)}
              onClick={() => toggleMusician(musician.uuid)}
            />
          ))}
          {unselectedMusicians.map((musician) => (
            <MusicianSelectButton
              key={musician.uuid}
              label={musician.nickname}
              isSelected={musicianList.includes(musician.uuid)}
              onClick={() => toggleMusician(musician.uuid)}
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
