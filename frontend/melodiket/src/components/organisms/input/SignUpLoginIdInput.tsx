'use client';

import Input from '@/components/atoms/input/Input';
import AlertLabel from '@/components/atoms/label/AlertLabel';
import useSignUpStore from '@/store/signUpStore';

const SignUpLoginIdInput = () => {
  const { loginId, setLoginId } = useSignUpStore();

  const handleLoginIdDuplicate = () => {
    // loginId를 서버로 보내 응답 얻어오기
    // 중복됐다면, AlertLabel 보여주기
  };

  return (
    <div>
      <Input
        value={loginId}
        onChange={setLoginId}
        onBlur={handleLoginIdDuplicate}
        placeholder="아이디"
      />
      <AlertLabel label="아이디가 중복됩니다." />
    </div>
  );
};

export default SignUpLoginIdInput;
