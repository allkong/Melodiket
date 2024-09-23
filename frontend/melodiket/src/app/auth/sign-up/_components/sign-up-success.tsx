'use client';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import useConfetti from '@/hooks/useConfetti';
import { useEffect } from 'react';

interface SignUpSuccessProps {
  onNext: () => void;
}

const SignUpSuccess = ({ onNext }: SignUpSuccessProps) => {
  const fire = useConfetti();

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow h-0 pt-[10vh] overflow-y-auto">
        <TextBanner
          hasLogo
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

export default SignUpSuccess;
