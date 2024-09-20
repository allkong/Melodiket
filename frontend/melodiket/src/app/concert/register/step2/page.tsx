'use client';

import { useState } from 'react';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

const Step2 = ({ onNext }: { onNext: () => void }) => {
  const [musicians, setMusicians] = useState<string[]>([]);

  return (
    <div className="w-full p-4">
      <RegisterLabel
        mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
        subLabel="뮤지션을 선택해주세요"
      />
      <div className="my-4">
        {musicians.map((musician, index) => (
          <div key={index}>{musician}</div>
        ))}
      </div>
      <LargeButton label="다음" onClick={onNext} />
    </div>
  );
};

export default Step2;
