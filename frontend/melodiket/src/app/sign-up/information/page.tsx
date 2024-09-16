'use client';

import LargeButton from '@/components/atoms/button/LargeButton';
import Input from '@/components/atoms/input/Input';
import SignUpLabel from '@/components/organisms/label/SignUpLabel';
import useSignUpStore from '@/store/signUpStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();

  const { loginId, setLoginId, nickname, setNickname, password, setPassword } =
    useSignUpStore();

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const isPasswordValid = password === passwordConfirm;

  const isFormValid = !!loginId && !!nickname && !!password && isPasswordValid;

  return (
    <div className="w-full max-w-full h-full flex flex-col">
      <div className="flex-grow mt-24">
        <SignUpLabel
          mainLabel="회원 정보를 입력해주세요"
          subLabel="멜로디켓 서비스는 블록체인을 사용한 서비스에요"
        />
        <div className="flex flex-col mt-9 gap-3">
          <Input value={nickname} onChange={setNickname} placeholder="닉네임" />
          <Input value={loginId} onChange={setLoginId} placeholder="아이디" />
          <Input
            value={password}
            onChange={setPassword}
            placeholder="비밀번호"
            type="password"
          />
          <Input
            value={passwordConfirm}
            onChange={setPasswordConfirm}
            placeholder="비밀번호 확인"
            type="password"
          />
          {!isPasswordValid && (
            <p className="text-red-400">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
      </div>
      <div className="my-4 h-fit">
        <LargeButton
          label="다음"
          disabled={!isFormValid}
          onClick={() => router.push('/sign-up/description')}
        />
      </div>
    </div>
  );
};

export default Page;
