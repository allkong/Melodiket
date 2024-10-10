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
          description={
            '회원가입을 할 때 블록체인 지갑을 만들어 드릴거에요.\n지갑을 생성하는데 최대 20초가 소요될 수 있어요.'
          }
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
