'use client';

import { useRouter } from 'next/navigation';

import LargeButton from '@/components/atoms/button/LargeButton';
import SignUpLabel from '@/components/organisms/label/SignUpLabel';
import useSignUpStore from '@/store/signUpStore';
import SignUpNicknameInput from '@/components/organisms/input/SignUpNicknameInput';
import SignUpLoginIdInput from '@/components/organisms/input/SignUpLoginIdInput';
import SignUpPasswordInput from '@/components/organisms/input/SignUpPasswordInput';

const Page = () => {
  const router = useRouter();

  const { loginId, nickname, password, passwordConfirm } = useSignUpStore();

  const isFormValid =
    !!loginId && !!nickname && !!password && password === passwordConfirm;

  return (
    <div className="w-full max-w-full h-full flex flex-col">
      <div className="flex-grow mt-24">
        <SignUpLabel
          mainLabel="회원 정보를 입력해주세요"
          subLabel="멜로디켓 서비스는 블록체인을 사용한 서비스에요"
        />
        <div className="flex flex-col mt-9 gap-3">
          <SignUpNicknameInput />
          <SignUpLoginIdInput />
          <SignUpPasswordInput />
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
