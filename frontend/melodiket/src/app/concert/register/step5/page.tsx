'use client';

import { useRouter } from 'next/navigation';

import Header from '@/components/organisms/navigation/Header';
import LargeButton from '@/components/atoms/button/LargeButton';
import RegisterLabel from '@/components/molecules/label/RegisterLabel';

const Step5 = () => {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/concert'); // 완료 후 메인 페이지로 이동
  };

  return (
    <div>
      <Header />
      <div className="p-40">
        <RegisterLabel
          mainLabel="공연 등록 완료!"
          subLabel="뮤지션들에게 공연 승인 알람을 보냈어요"
        />
        <p>공연 등록이 성공적으로 완료되었습니다.</p>
        <LargeButton label="이동" onClick={handleComplete} />
      </div>
    </div>
  );
};

export default Step5;
