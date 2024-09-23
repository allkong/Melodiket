'use client';

import { useRouter } from 'next/navigation';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';

const Step5 = () => {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/concert');
  };

  return (
    <div className="w-full p-4">
      <TextBanner
        title="공연 등록 완료!"
        description="뮤지션들에게 공연 승인 알람을 보냈어요"
      />
      <LargeButton label="이동" onClick={handleComplete} />
    </div>
  );
};

export default Step5;
