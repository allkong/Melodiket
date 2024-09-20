'use client';

import { useState } from 'react';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';
import Input from '@/components/atoms/input/Input';
import MusicianSelectButton from '@/components/molecules/button/MusicianSelectButton';

const Step2 = ({ onNext }: { onNext: () => void }) => {
  const [musicians, setMusicians] = useState<string[]>([]);

  return (
    <div className="w-full p-4">
      <RegisterLabel
        mainLabel="공연 등록을 위해 공연 정보를 입력해주세요"
        subLabel="뮤지션을 선택해주세요"
      />
      <div className="mt-10 mb-4">
        <Input placeholder="이름" />
      </div>
      <div className="my-4">
        <MusicianSelectButton label="주나주나" />
        <MusicianSelectButton label="정다빈밴드" />
        <MusicianSelectButton label="잔나비" />
        <MusicianSelectButton label="이디어츠" />
        <MusicianSelectButton label="박유빈" />
      </div>
      <LargeButton label="다음" onClick={onNext} />
    </div>
  );
};

export default Step2;
