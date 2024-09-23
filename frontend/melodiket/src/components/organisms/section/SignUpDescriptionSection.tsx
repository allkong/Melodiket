'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import Textarea from '@/components/atoms/textarea/Textarea';

interface SignUpDescriptionSectionProps {
  onNext: (value: string) => void;
}

const SignUpDescriptionSection = ({
  onNext,
}: SignUpDescriptionSectionProps) => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center flex-grow">
        <TextBanner
          title="회원 소개를 입력해주세요"
          description="멜로디켓 서비스는 블록체인을 사용한 서비스에요"
        />
        <div className="flex flex-col mt-9 gap-3">
          <Textarea value={value} onChange={setValue} rows={5} limit={150} />
        </div>
      </div>
      <div className="my-4 h-fit">
        <LargeButton label="다음" onClick={() => onNext(value)} />
      </div>
    </div>
  );
};

export default SignUpDescriptionSection;
