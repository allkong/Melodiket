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
    <div className="w-full p-4">
      <TextBanner
        title="공연 등록 완료!"
        description="뮤지션들에게 공연 승인 알람을 보냈어요"
      />
      <LargeButton label="완료" onClick={() => onNext()} />
    </div>
  );
};

export default RegisterSuccess;
