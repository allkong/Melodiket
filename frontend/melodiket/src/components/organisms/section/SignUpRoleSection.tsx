'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import SignUpLabel from '@/components/molecules/label/SignUpLabel';
import SignUpRoleRadio from '@/components/molecules/radio/SignUpRoleRadio';
import { SIGN_UP_ROLE_DATAS } from '@/constants/signUp';
import type { SignUpRole } from '@/types/signUp';

interface SignUpRoleSectionProps {
  onNext: (value: SignUpRole['value']) => void;
}

const SignUpRoleSection = ({ onNext }: SignUpRoleSectionProps) => {
  const [role, setRole] = useState<SignUpRole['value'] | null>(null);

  const handleChange = (value: string) => {
    setRole(value as SignUpRole['value']);
  };

  const isCheckValid = role !== null;

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
          onClick={() => {
            if (isCheckValid) {
              onNext(role);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignUpRoleSection;
