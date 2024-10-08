'use client';

import { useErrorBoundary } from 'react-error-boundary';
import LargeButton from '@/components/atoms/button/LargeButton';
import { useRouter } from 'next/navigation';

const ErrorComponent = () => {
  const router = useRouter();
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-11 pb-[20vh]">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-semibold">오류가 발생했어요</p>
        <p className="text-base font-medium">다시 한번 요청을 시도해주세요</p>
      </div>
      <div className="flex gap-2 w-full px-20">
        <LargeButton label="홈으로" onClick={() => router.push('/')} />
        <LargeButton label="재시도" onClick={resetBoundary} />
      </div>
    </div>
  );
};

export default ErrorComponent;
