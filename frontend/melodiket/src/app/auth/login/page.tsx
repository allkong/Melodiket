'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { useLogin } from '@/services/auth/fetchAuth';

import { LogoText } from '@/public/icons';
import Input from '@/components/atoms/input/Input';
import TextBanner from '@/components/molecules/text/TextBanner';
import FixedButton from '@/components/organisms/controls/FixedButton';

const Page = () => {
  const { mutate: login } = useLogin();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ loginId, password });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-7">
        <LogoText className="h-auto w-28" />
      </div>
      <div className="flex flex-col items-center px-6 space-y-10 mt-[8vh]">
        <div className="w-full">
          <TextBanner
            title={`안녕하세요.\n멜로디켓입니다.`}
            description="회원 서비스를 이용하시려면 로그인 해주세요."
            hasLogo
          />
        </div>
        <div className="w-full space-y-3">
          <Input value={loginId} onChange={setLoginId} placeholder="아이디" />
          <Input
            value={password}
            onChange={setPassword}
            placeholder="비밀번호"
            type="password"
            onClickEnter={handleLogin}
          />
        </div>
        <div className="flex flex-row space-x-2.5 text-sm text-gray-400">
          <p
            onClick={() => toast('준비중', { icon: '🔨' })}
            className="cursor-pointer"
          >
            ID/PW 찾기
          </p>
          <p>|</p>
          <Link href={'/auth/sign-up?step=policy'}>회원가입</Link>
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
