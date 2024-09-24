'use client';

import { useEffect, useState } from 'react';

import Input from '@/components/atoms/input/Input';
import AlertLabel from '@/components/atoms/label/AlertLabel';
import { SIGN_UP_DATA_LENGTH_LIMITS } from '@/constants/signUp';

const MIN_LENGTH = SIGN_UP_DATA_LENGTH_LIMITS.MIN_LOGIN_ID_LENGTH;
const MAX_LENGTH = SIGN_UP_DATA_LENGTH_LIMITS.MAX_LOGIN_ID_LENGTH;

interface SignUpLoginIdInputProps {
  loginId: string;
  setLoginId: (value: string) => void;
  setIsLoginIdValid: (value: boolean) => void;
}

const SignUpLoginIdInput = ({
  loginId,
  setLoginId,
  setIsLoginIdValid,
}: SignUpLoginIdInputProps) => {
  const [isLengthValid, setIsLengthValid] = useState(true);
  const [isDuplicateValid, setIsDuplicateValid] = useState(true);

  const validateLoginIdLength = (value: string) => {
    return MIN_LENGTH <= value.length && value.length <= MAX_LENGTH;
  };

  const validateLoginIdDuplicate = (value: string) => {
    // value를 서버로 보내 중복 검증
    return true;
  };

  const handleLoginIdChange = (value: string) => {
    setLoginId(value);
    setIsLengthValid(validateLoginIdLength(value));
  };

  const handleLoginIdDuplicate = () => {
    setIsDuplicateValid(validateLoginIdDuplicate(loginId));
  };

  const getAlertLabel = () => {
    if (!isLengthValid) {
      return (
        <AlertLabel
          label={`${MIN_LENGTH}자 이상, ${MAX_LENGTH}자 이하의 아이디만 가능합니다.`}
        />
      );
    } else if (!isDuplicateValid) {
      return <AlertLabel label="아이디가 중복됩니다." />;
    }
    return null;
  };

  useEffect(() => {
    setIsLoginIdValid(isLengthValid && isDuplicateValid);
  }, [isLengthValid, isDuplicateValid, setIsLoginIdValid]);

  return (
    <div>
      <Input
        value={loginId}
        onChange={handleLoginIdChange}
        onBlur={handleLoginIdDuplicate}
        placeholder="아이디"
      />
      {getAlertLabel()}
    </div>
  );
};

export default SignUpLoginIdInput;
