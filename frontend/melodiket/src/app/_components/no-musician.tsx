'use client';

import LargeButton from '@/components/atoms/button/LargeButton';
import { useRouter } from 'next/navigation';

const NoMusician = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full backdrop-blur-md px-5 py-5">
      <p className="text-lg font-semibold text-primary">
        등록된 뮤지션이 없어요 😥
      </p>
      <div className="w-full px-14">
        <LargeButton
          label="내 뮤지션 찾기"
          onClick={() => router.push('/musicians')}
        />
      </div>
    </div>
  );
};

export default NoMusician;
