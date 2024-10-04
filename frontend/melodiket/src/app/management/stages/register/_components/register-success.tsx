'use client';

import { useEffect } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';

import useConfetti from '@/hooks/useConfetti';

interface RegisterSuccessProps {
  onNext: () => void;
}

const RegisterSuccess = ({ onNext }: RegisterSuccessProps) => {
  const fire = useConfetti();

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow h-0 overflow-y-auto">
        <TextBanner
          title="공연장 등록 완료!"
          description="공연장에 공연을 생성해보세요"
        />
      </div>
      <div className="my-4 h-fit">
        <LargeButton label="완료" onClick={() => onNext()} />
      </div>
    </div>
  );
};

export default RegisterSuccess;
