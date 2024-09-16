'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import LoginLabel from '@/components/organisms/label/LoginLabel';
import AllCheckbox from '@/components/molecules/checkbox/AllCheckbox';
import LabelCheckbox from '@/components/molecules/checkbox/LabelCheckbox';
import { useRouter } from 'next/navigation';

import { SIGN_UP_POLICY_DATAS } from '@/constants/signUp';

const Page = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(
    SIGN_UP_POLICY_DATAS.map(() => false)
  );

  const handleCheck = (targetIdx: number, newValue: boolean) => {
    setIsChecked(
      isChecked.map((value, idx) => (idx !== targetIdx ? value : newValue))
    );
  };

  const handleCheckAll = (value: boolean) => {
    setIsChecked([value, value, value, value]);
  };

  const isCheckedAll = isChecked.every((value) => value);

  const isCheckValid = isChecked
    .filter((_, idx) => SIGN_UP_POLICY_DATAS[idx].isEssential)
    .every((value) => value);

  return (
    <div className="w-full max-w-full h-full flex flex-col">
      <div className="flex-grow">
        <LoginLabel
          mainLabel={'멜로디켓 회원가입을 위해\n약관에 동의해 주세요.'}
          subLabel={'멜로디켓 서비스는 블록체인을 사용한 서비스에요.'}
        />
        <div className="mt-9 flex flex-col gap-4">
          <AllCheckbox
            label="전체 동의"
            isChecked={isCheckedAll}
            onChange={handleCheckAll}
          />
          {SIGN_UP_POLICY_DATAS.map((data, idx) => (
            <LabelCheckbox
              key={data.key}
              label={data.label}
              isChecked={isChecked[idx]}
              onChange={(value) => handleCheck(idx, value)}
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
