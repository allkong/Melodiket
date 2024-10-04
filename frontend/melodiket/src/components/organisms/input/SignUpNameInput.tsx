import Input from '@/components/atoms/input/Input';
import AlertLabel from '@/components/atoms/label/AlertLabel';
import { useEffect, useState } from 'react';

interface SignUpNameInputProps {
  name: string;
  setName: (value: string) => void;
  setIsNameValid: (value: boolean) => void;
}

const SignUpNameInput = ({
  name,
  setName,
  setIsNameValid,
}: SignUpNameInputProps) => {
  const [isLengthValid, setIsLengthValid] = useState(true);

  const handleChange = (value: string) => {
    setName(value);
    setIsLengthValid(value !== '');
  };

  useEffect(() => {
    setIsNameValid(isLengthValid);
  }, [setIsLengthValid, isLengthValid]);

  return (
    <div>
      <Input value={name} onChange={handleChange} placeholder="이름" />
      {!isLengthValid && <AlertLabel label="이름을 입력해주세요." />}
    </div>
  );
};

export default SignUpNameInput;
