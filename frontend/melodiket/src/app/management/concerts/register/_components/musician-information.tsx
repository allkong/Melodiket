'use client';

import { useState, useEffect, useRef } from 'react';
import { useMusiciansQuery } from '@/services/musician/fetchMusician';

import useIsOnScreen from '@/hooks/useIsOnScreen';
import { ConcertData } from '@/types/concert';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import MusicianSelectButton from '@/components/molecules/button/MusicianSelectButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import LineDivider from '@/components/atoms/divider/LineDivider';
import IsEnd from '@/components/atoms/label/IsEnd';
import IsError from '@/components/atoms/button/IsErrorButton';
import MusicianSelectButtonSkeleton from '@/components/molecules/button/MusicianSelectButtonSkeleton';

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

  const { data, isFetching, error, hasNextPage, fetchNextPage, refetch } =
    useMusiciansQuery();
  const endRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useIsOnScreen(endRef);

  useEffect(() => {
    if (isOnScreen && hasNextPage) {
      fetchNextPage();
    }
  }, [isOnScreen, hasNextPage, fetchNextPage]);

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
  const filteredMusicians = musicianName.trim()
    ? allMusicians.filter((musician) =>
        musician.nickname.toLowerCase().includes(musicianName.toLowerCase())
      )
    : allMusicians;

  const selectedMusicians = filteredMusicians.filter((musician) =>
    musicianList.includes(musician.uuid)
  );
  const unselectedMusicians = filteredMusicians.filter(
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
          {selectedMusicians.length > 0 && (
            <>
              {selectedMusicians.map((musician) => (
                <MusicianSelectButton
                  key={musician.uuid}
                  label={musician.nickname}
                  isSelected={true}
                  onClick={() => toggleMusician(musician.uuid)}
                />
              ))}
              <LineDivider />
            </>
          )}
          {unselectedMusicians.map((musician) => (
            <MusicianSelectButton
              key={musician.uuid}
              label={musician.nickname}
              isSelected={false}
              onClick={() => toggleMusician(musician.uuid)}
            />
          ))}
          {isFetching && <MusicianSelectButtonSkeleton count={6} />}
          {error && <IsError onClick={refetch} />}
          {data && !hasNextPage && <IsEnd />}
          <div ref={endRef} className="h-10" />
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
