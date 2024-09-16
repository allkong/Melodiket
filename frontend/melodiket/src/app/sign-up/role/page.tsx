'use client';

import { useRouter } from 'next/navigation';

import LargeButton from '@/components/atoms/button/LargeButton';
import SignUpLabel from '@/components/organisms/label/SignUpLabel';
import SignUpRoleRadio from '@/components/organisms/radio/SignUpRoleRadio';

import { SIGN_UP_ROLE_DATAS } from '@/constants/signUp';
import useSignUpStore from '@/store/signUpStore';

const Page = () => {
  const router = useRouter();

  const { role, setRole } = useSignUpStore();

  const handleChange = (value: string) => {
    setRole(value);
  };

  const isCheckValid = role !== '';

  return (
    <div className="w-full max-w-full h-full flex flex-col">
      <div className="flex-grow mt-24">
        <SignUpLabel
          mainLabel="역할을 선택해주세요."
          subLabel="멜로디켓 서비스는 블록체인을 사용한 서비스에요."
        />
        <div className="mt-9 flex flex-col gap-4">
          {SIGN_UP_ROLE_DATAS.map((data) => (
            <SignUpRoleRadio
              key={data.key}
              mainLabel={data.mainLabel}
              subLabel={data.subLabel}
              value={data.value}
              name="role"
              checked={role === data.value}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
      <div className="my-4 h-fit">
        <LargeButton
          label="다음"
          disabled={!isCheckValid}
          onClick={() => router.push('/sign-up/information')}
        />
      </div>
    </div>
  );
};

export default Page;
