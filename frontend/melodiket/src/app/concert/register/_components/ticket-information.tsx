'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import TextBanner from '@/components/molecules/text/TextBanner';

import { ConcertData } from '@/types/concert';

interface TicketInformationProps {
  concertData: ConcertData;
  onNext: (data: ConcertData) => void;
}

const TicketInformation = ({ concertData, onNext }: TicketInformationProps) => {
  const [ticketPrice, setTicketPrice] = useState('');
  const [ownerStake, setOwnerStake] = useState('');
  const [musicianStake, setMusicianStake] = useState('');
  const [favoriteMusicianStake, setFavoriteMusicianStake] = useState('');

  const isFormValid =
    ticketPrice &&
    ownerStake &&
    musicianStake &&
    favoriteMusicianStake &&
    Number(ticketPrice) ===
      Number(ownerStake) +
        Number(musicianStake) +
        Number(favoriteMusicianStake);

  const handleNext = () => {
    const updatedConcertData: ConcertData = {
      ...concertData,
      ticketPrice: Number(ticketPrice),
      ownerStake: Number(ownerStake),
      musicianStake: Number(musicianStake),
      favoriteMusicianStake: Number(favoriteMusicianStake),
    };
    onNext(updatedConcertData);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow h-0 overflow-y-auto">
        <TextBanner
          title="공연 등록을 위해 공연 정보를 입력해주세요"
          description="티켓 정보를 입력해주세요"
        />
        <div className="mt-10 mb-4">
          <h2 className="font-semibold mb-2">티켓 가격</h2>
          <Input
            value={ticketPrice}
            onChange={setTicketPrice}
            placeholder="티켓 가격"
          />
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">수익 분배</h2>
          <div className="mb-2">
            <Input
              placeholder="공연장"
              value={ownerStake}
              onChange={setOwnerStake}
            />
          </div>
          <div className="mb-2">
            <Input
              placeholder="뮤지션"
              value={musicianStake}
              onChange={setMusicianStake}
            />
          </div>
          <Input
            placeholder="추가 비율"
            value={favoriteMusicianStake}
            onChange={setFavoriteMusicianStake}
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

export default TicketInformation;
