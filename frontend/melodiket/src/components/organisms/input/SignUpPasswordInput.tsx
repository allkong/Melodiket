'use client';

import { useEffect, useState } from 'react';

import Input from '@/components/atoms/input/Input';
import AlertLabel from '@/components/atoms/label/AlertLabel';
import { SIGN_UP_DATA_LENGTH_LIMITS } from '@/constants/signUp';

const MIN_LENGTH = SIGN_UP_DATA_LENGTH_LIMITS.MIN_PASSWORD_LENGTH;
const MAX_LENGTH = SIGN_UP_DATA_LENGTH_LIMITS.MAX_PASSWORD_LENGTH;

interface SignUpPasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (value: string) => void;
  setIsPasswordValid: (value: boolean) => void;
}

const SignUpPasswordInput = ({
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  setIsPasswordValid,
}: SignUpPasswordInputProps) => {
  const [isLengthValid, setIsLengthValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const validatePasswordLength = (value: string) => {
    return MIN_LENGTH <= value.length && value.length <= MAX_LENGTH;
  };

  const validatePasswordMatch = (password: string, passwordConfirm: string) =>
    password === passwordConfirm;

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    setIsLengthValid(validatePasswordLength(password));
  };

  const handlePasswordConfirmChange = (passwordConfirm: string) => {
    setPasswordConfirm(passwordConfirm);
    setIsPasswordMatch(validatePasswordMatch(password, passwordConfirm));
  };

  useEffect(() => {
    setIsPasswordValid(isLengthValid && isPasswordMatch);
  }, [setIsPasswordValid, isLengthValid, isPasswordMatch]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Input
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          type="password"
        />
        {!isLengthValid && (
          <AlertLabel
            label={`${MIN_LENGTH}자 이상, ${MAX_LENGTH}자 이하의 비밀번호만 가능합니다.`}
          />
        )}
      </div>
      <div>
        <Input
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          placeholder="비밀번호 확인"
          type="password"
        />
        {!isPasswordMatch && (
          <AlertLabel label="비밀번호가 일치하지 않습니다." />
        )}
      </div>
    </div>
  );
};

export default SignUpPasswordInput;
