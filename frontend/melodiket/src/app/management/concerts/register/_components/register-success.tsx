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
      <div className="flex-grow h-0 overflow-y-auto mt-[10vh]">
        <TextBanner
          hasLogo
          title="공연 등록 신청 완료!"
          description={`블록체인에 공연 정보가 기록되고 있어요.\n\n공연이 성공적으로 생성되면\n알림과 함께 뮤지션들에게 알림이 전송돼요.`}
        />
      </div>
      <div className="my-4 h-fit">
        <LargeButton label="완료" onClick={() => onNext()} />
      </div>
    </div>
  );
};

export default RegisterSuccess;
