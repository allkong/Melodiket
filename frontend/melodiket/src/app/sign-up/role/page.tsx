'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import LargeButton from '@/components/atoms/button/LargeButton';
import LoginLabel from '@/components/organisms/label/LoginLabel';
import LoginRoleRadio from '@/components/organisms/radio/LoginRoleRadio';

import { SIGN_UP_ROLE_DATAS } from '@/constants/signUp';

const Page = () => {
  const router = useRouter();

  const [checkedValue, setCheckedValue] = useState<string>();

  const handleChange = (value: string) => {
    setCheckedValue(value);
  };

  const isCheckValid = checkedValue !== undefined;

  return (
    <div className="w-full max-w-full h-full flex flex-col">
      <div className="flex-grow">
        <LoginLabel
          mainLabel="역할을 선택해주세요."
          subLabel="멜로디켓 서비스는 블록체인을 사용한 서비스에요."
        />
        <div className="mt-9 flex flex-col gap-4">
          {SIGN_UP_ROLE_DATAS.map((data) => (
            <LoginRoleRadio
              key={data.key}
              mainLabel={data.mainLabel}
              subLabel={data.subLabel}
              value={data.value}
              name="role"
              checked={checkedValue === data.value}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
      <div className="my-4 h-fit">
        <LargeButton
          label="다음"
          disabled={!isCheckValid}
          onClick={() => router.push('/sign-up/role')}
        />
      </div>
    </div>
  );
};

export default Page;
