'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/organisms/navigation/Header';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

const Step4 = () => {
  const router = useRouter();
  const [venue, setVenue] = useState<string | null>(null);

  const handleNext = () => {
    router.push('/concert/register/step5');
  };

  const handleSelectVenue = (selectedVenue: string) => {
    setVenue(selectedVenue);
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <RegisterLabel
          mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
          subLabel="공연장을 선택해주세요"
        />
        <div className="my-4">
          <div onClick={() => handleSelectVenue('고척 스카이돔')}>
            고척 스카이돔
          </div>
          <div onClick={() => handleSelectVenue('서울 월드컵 경기장')}>
            서울 월드컵 경기장
          </div>
        </div>
        <LargeButton label="다음" onClick={handleNext} disabled={!venue} />
      </div>
    </div>
  );
};

export default Step4;
