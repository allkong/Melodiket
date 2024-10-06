'use client';

import { useRouter } from 'next/navigation';

import Header from '@/components/organisms/navigation/Header';
import Warning from '@/components/atoms/feedback/Warning';
import MediumButton from '@/components/atoms/button/MediumButton';

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center h-full mb-[8vh]">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-4 text-[2rem] font-semibold">
            4<Warning type="error" />4
          </div>
          <p className="text-lg font-medium text-gray-600">
            페이지를 찾을 수 없어요😥
          </p>
        </div>
        <div className="mt-8 space-x-3">
          <MediumButton label="이전 화면" onClick={handleGoBack} color="gray" />
          <MediumButton label="홈으로 가기" onClick={handleGoHome} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
