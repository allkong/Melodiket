'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { LogoText } from '@/public/icons';
import Input from '@/components/atoms/input/Input';
import TextBanner from '@/components/molecules/text/TextBanner';
import FixedButton from '@/components/organisms/controls/FixedButton';

const Page = () => {
  const router = useRouter();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 실행
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-7">
        <LogoText />
      </div>
      <div className="flex flex-col items-center px-6 space-y-10 mt-[8vh]">
        <div className="w-full">
          <TextBanner
            title={`안녕하세요.\n멜로디켓입니다.`}
            description="회원 서비스를 이용하시려면 로그인 해주세요."
            hasLogo
          />
        </div>
        <div className="space-y-3 w-full">
          <Input value={loginId} onChange={setLoginId} placeholder="아이디" />
          <Input
            value={password}
            onChange={setPassword}
            placeholder="비밀번호"
            type="password"
          />
        </div>
        <div className="flex flex-row space-x-2.5 text-sm text-gray-400">
          <p onClick={() => alert('준비중🔨')} className="cursor-pointer">
            ID/PW 찾기
          </p>
          <p>|</p>
          <Link href={'/auth/sign-up'}>회원가입</Link>
        </div>
      </div>
      <FixedButton
        label="로그인"
        disabled={!loginId || !password}
        onClick={handleLogin}
      />
    </div>
  );
};

export default Page;