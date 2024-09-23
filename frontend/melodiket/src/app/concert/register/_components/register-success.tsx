'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

import useConfetti from '@/hooks/useConfetti';

const RegisterSuccess = () => {
  const fire = useConfetti();

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <div className="w-full p-4">
      <RegisterLabel
        mainLabel="공연 등록 완료!"
        subLabel="뮤지션들에게 공연 승인 알람을 보냈어요"
      />
      <LargeButton label="이동" />
    </div>
  );
};

export default RegisterSuccess;
