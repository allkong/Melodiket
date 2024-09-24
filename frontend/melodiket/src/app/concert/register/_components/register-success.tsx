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
          title="공연 등록 완료!"
          description="뮤지션들에게 공연 승인 알람을 보냈어요"
        />
      </div>
      <div className="my-4 h-fit">
        <LargeButton label="완료" onClick={() => onNext()} />
      </div>
    </div>
  );
};

export default RegisterSuccess;
