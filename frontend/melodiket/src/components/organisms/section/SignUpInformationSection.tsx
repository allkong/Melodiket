'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import SignUpLabel from '@/components/molecules/label/SignUpLabel';
import SignUpNicknameInput from '@/components/organisms/input/SignUpNicknameInput';
import SignUpLoginIdInput from '@/components/organisms/input/SignUpLoginIdInput';
import SignUpPasswordInput from '@/components/organisms/input/SignUpPasswordInput';
import type { SignUpData } from '@/types/signUp';

interface SignUpInformationSectionProps {
  onNext: (value: Omit<SignUpData, 'role' | 'description'>) => void;
}

const SignUpInformationSection = ({
  onNext,
}: SignUpInformationSectionProps) => {
  const [loginId, setLoginId] = useState('');
  const [isLoginIdValid, setIsLoginIdValid] = useState(true);

  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const isFormValid =
    !!loginId &&
    isLoginIdValid &&
    !!nickname &&
    isNicknameValid &&
    !!password &&
    !!passwordConfirm &&
    isPasswordValid;

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center flex-grow">
        <SignUpLabel
          mainLabel="회원 정보를 입력해주세요"
          subLabel="멜로디켓 서비스는 블록체인을 사용한 서비스에요"
        />
        <div className="flex flex-col mt-9 gap-3">
          <SignUpNicknameInput
            nickname={nickname}
            setNickname={setNickname}
            setIsNicknameValid={setIsNicknameValid}
          />
          <SignUpLoginIdInput
            loginId={loginId}
            setLoginId={setLoginId}
            setIsLoginIdValid={setIsLoginIdValid}
          />
          <SignUpPasswordInput
            password={password}
            setPassword={setPassword}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
            setIsPasswordValid={setIsPasswordValid}
          />
        </div>
      </div>
      <div className="my-4 h-fit">
        <LargeButton
          label="다음"
          disabled={!isFormValid}
          onClick={() => onNext({ loginId, nickname, password })}
        />
      </div>
    </div>
  );
};

export default SignUpInformationSection;
