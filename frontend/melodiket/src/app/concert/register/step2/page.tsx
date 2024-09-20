'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/organisms/navigation/Header';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

const Step2 = () => {
  const router = useRouter();
  const [musicians, setMusicians] = useState<string[]>([]);

  const handleNext = () => {
    router.push('/concert/register/step3');
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <RegisterLabel
          mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
          subLabel="뮤지션을 선택해주세요"
        />
        <div className="my-4">
          {musicians.map((musician, index) => (
            <div key={index}>{musician}</div>
          ))}
        </div>
        <LargeButton label="3명 선택하기" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Step2;
