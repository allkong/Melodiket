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

  console.log(data);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loadMoreRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );

      observer.observe(loadMoreRef.current);

      return () => {
        if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
      };
    }
  }, [hasNextPage, fetchNextPage]);

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

  const filteredMusicians = musicianName
    ? allMusicians.filter((musician) =>
        musician.name.toLowerCase().includes(musicianName.toLowerCase())
      )
    : allMusicians;

  const selectedMusicians = allMusicians.filter(
    (musician) => !!musicianList[musician.name]
  );
  const unselectedMusicians = allMusicians.filter(
    (musician) => !musicianList[musician.name]
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
                key={musician.musicianUuid}
                label={musician.name}
                isSelected={!!musicianList[musician.name]}
                onClick={() => toggleMusician(musician.name)}
              />
            ))}
          {filteredMusicians.length > 0 && <LineDivider />}
          {selectedMusicians.map((musician) => (
            <MusicianSelectButton
              key={musician.musicianUuid}
              label={musician.name}
              isSelected={!!musicianList[musician.name]}
              onClick={() => toggleMusician(musician.name)}
            />
          ))}
          {unselectedMusicians.map((musician) => (
            <MusicianSelectButton
              key={musician.musicianUuid}
              label={musician.name}
              isSelected={!!musicianList[musician.name]}
              onClick={() => toggleMusician(musician.name)}
            />
          ))}
          <div ref={loadMoreRef} className="h-10" />
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
