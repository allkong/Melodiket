'use client';

import Input from '@/components/atoms/input/Input';
import AlertLabel from '@/components/atoms/label/AlertLabel';
import useSignUpStore from '@/store/signUpStore';

const SignUpPasswordInput = () => {
  const { password, setPassword, passwordConfirm, setPasswordConfirm } =
    useSignUpStore();

  const isPasswordValid = password === passwordConfirm;

  return (
    <div className="flex flex-col gap-3">
      <Input
        value={password}
        onChange={setPassword}
        placeholder="비밀번호"
        type="password"
      />
      <div>
        <Input
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          placeholder="비밀번호 확인"
          type="password"
        />
        {!isPasswordValid && (
          <AlertLabel label="비밀번호가 일치하지 않습니다." />
        )}
      </div>
    </div>
  );
};

export default SignUpPasswordInput;
