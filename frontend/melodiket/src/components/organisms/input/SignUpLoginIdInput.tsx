'use client';

import { useEffect, useState } from 'react';

import Input from '@/components/atoms/input/Input';
import AlertLabel from '@/components/atoms/label/AlertLabel';
import { SIGN_UP_DATA_LENGTH_LIMITS } from '@/constants/signUp';
import { useIsLoginIdDuplicated } from '@/services/auth/fetchAuth';

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
  const [isTyping, setIsTyping] = useState(false);
  const mutate = useIsLoginIdDuplicated();

  const validateLoginIdLength = (value: string) => {
    return MIN_LENGTH <= value.length && value.length <= MAX_LENGTH;
  };

  const validateLoginIdDuplicate = async (value: string) => {
    const { loginId: isDuplicated } = await mutate.mutateAsync({
      loginId: value,
    });

    return !isDuplicated;
  };

  const handleLoginIdChange = (value: string) => {
    setLoginId(value);
    setIsLengthValid(validateLoginIdLength(value));

    setIsTyping(true);
    setIsDuplicateValid(true);
  };

  const handleLoginIdDuplicate = async () => {
    const result = await validateLoginIdDuplicate(loginId);
    setIsDuplicateValid(result);
    setIsTyping(false);
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
    setIsLoginIdValid(isLengthValid && isDuplicateValid && !isTyping);
  }, [isLengthValid, isDuplicateValid, isTyping, setIsLoginIdValid]);

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
