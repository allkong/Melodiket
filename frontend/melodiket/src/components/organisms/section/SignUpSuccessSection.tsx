'use client';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import useConfetti from '@/hooks/useConfetti';
import { useEffect } from 'react';

interface SignUpSuccessSectionProps {
  onNext: () => void;
}

const SignUpSuccessSection = ({ onNext }: SignUpSuccessSectionProps) => {
  const fire = useConfetti();

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <div className="w-full max-w-full h-full flex flex-col">
      <div className="flex-grow mt-24">
        <TextBanner
          title="회원가입 완료!"
          description="멜로디켓에서 원하는 공연을 찾아보세요."
        />
      </div>
      <div className="my-4 h-fit">
        <LargeButton label="로그인" onClick={() => onNext()} />
      </div>
    </div>
  );
};

export default SignUpSuccessSection;
