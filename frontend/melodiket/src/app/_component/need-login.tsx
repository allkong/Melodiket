'use client';

import { useRouter } from 'next/navigation';

import LargeButton from '@/components/atoms/button/LargeButton';
import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import { BEFORE_LOGIN_FAVORITE_MUSICIANS } from '@/constants/signUp';

const NeedLogin = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full relative flex overflow-hidden">
      <div className="w-full h-full flex gap-2 overflow-hidden opacity-40">
        {BEFORE_LOGIN_FAVORITE_MUSICIANS.map((musician) => (
          <MusicianProfileCard
            key={musician.loginId}
            musicianName={musician.nickname}
            src={musician.imageUrl}
          />
        ))}
      </div>
      <div className="absolute flex flex-col items-center justify-center gap-2 w-full h-full backdrop-blur-md px-14">
        <p className="text-lg font-semibold text-purple-500">
          로그인이 필요한 서비스에요.
        </p>
        <LargeButton
          label="로그인"
          onClick={() => router.push('/auth/login')}
        />
      </div>
    </div>
  );
};

export default NeedLogin;
