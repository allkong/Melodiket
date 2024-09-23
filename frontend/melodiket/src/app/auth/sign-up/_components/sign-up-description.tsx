'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import Textarea from '@/components/atoms/textarea/Textarea';

interface SignUpDescriptionProps {
  onNext: (value: string) => void;
}

const SignUpDescription = ({ onNext }: SignUpDescriptionProps) => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow h-0 pt-[10vh] overflow-y-auto">
        <TextBanner
          hasLogo
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

export default SignUpDescription;
