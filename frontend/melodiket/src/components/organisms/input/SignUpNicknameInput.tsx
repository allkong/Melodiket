'use client';

import Input from '@/components/atoms/input/Input';
import AlertLabel from '@/components/atoms/label/AlertLabel';
import useSignUpStore from '@/store/signUpStore';

const SignUpNicknameInput = () => {
  const { nickname, setNickname } = useSignUpStore();

  const handleNicknameDuplicate = () => {
    // nickname을 서버로 보내 응답 얻어오기
    // 중복됐다면, AlertLabel 보여주기
  };

  return (
    <div>
      <Input
        value={nickname}
        onChange={setNickname}
        onBlur={handleNicknameDuplicate}
        placeholder="닉네임"
      />
      <AlertLabel label="닉네임이 중복됩니다." />
    </div>
  );
};

export default SignUpNicknameInput;
