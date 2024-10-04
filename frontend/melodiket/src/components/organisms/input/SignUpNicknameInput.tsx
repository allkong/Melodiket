'use client';

import { useEffect, useState } from 'react';

import Input from '@/components/atoms/input/Input';
import AlertLabel from '@/components/atoms/label/AlertLabel';
import { SIGN_UP_DATA_LENGTH_LIMITS } from '@/constants/signUp';
import { useIsNicknameDuplicated } from '@/services/auth/useLogin';

interface SignUpNicknameInputProps {
  nickname: string;
  setNickname: (value: string) => void;
  setIsNicknameValid: (value: boolean) => void;
}

const MIN_LENGTH = SIGN_UP_DATA_LENGTH_LIMITS.MIN_NICKNAME_LENGTH;
const MAX_LENGTH = SIGN_UP_DATA_LENGTH_LIMITS.MAX_NICKNAME_LENGTH;

const SignUpNicknameInput = ({
  nickname,
  setNickname,
  setIsNicknameValid,
}: SignUpNicknameInputProps) => {
  const [isLengthValid, setIsLengthValid] = useState(true);
  const [isDuplicateValid, setIsDuplicateValid] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const mutate = useIsNicknameDuplicated();

  const validateNicknameLength = (value: string) => {
    return MIN_LENGTH <= value.length && value.length <= MAX_LENGTH;
  };

  const validateNicknameDuplicate = async (value: string) => {
    const { nickname: isNicknameDuplicated } = await mutate.mutateAsync({
      nickname: value,
    });
    return !isNicknameDuplicated;
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setIsLengthValid(validateNicknameLength(value));

    setIsTyping(true);
    setIsDuplicateValid(true);
  };

  const handleNicknameDuplicate = async () => {
    const response = await validateNicknameDuplicate(nickname);
    setIsDuplicateValid(response);
    setIsTyping(false);
  };

  const getAlertLabel = () => {
    if (!isLengthValid) {
      return (
        <AlertLabel
          label={`${MIN_LENGTH}자 이상, ${MAX_LENGTH}자 이하의 닉네임만 가능합니다.`}
        />
      );
    } else if (!isDuplicateValid) {
      return <AlertLabel label="닉네임이 중복됩니다." />;
    }
    return null;
  };

  useEffect(() => {
    setIsNicknameValid(isLengthValid && isDuplicateValid && !isTyping);
  }, [isLengthValid, isDuplicateValid, isTyping, setIsNicknameValid]);

  return (
    <div>
      <Input
        value={nickname}
        onChange={handleNicknameChange}
        onBlur={handleNicknameDuplicate}
        placeholder="닉네임"
      />
      {getAlertLabel()}
    </div>
  );
};

export default SignUpNicknameInput;
