'use client';

import { useState } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';
import TextBanner from '@/components/molecules/text/TextBanner';
import SignUpRoleRadio from '@/components/molecules/radio/SignUpRoleRadio';
import { SIGN_UP_ROLE_DATAS } from '@/constants/signUp';
import type { SignUpRole } from '@/types/signUp';

interface SignUpRoleSelectProps {
  onNext: (value: SignUpRole['value']) => void;
}

const SignUpRoleSelect = ({ onNext }: SignUpRoleSelectProps) => {
  const [role, setRole] = useState<SignUpRole['value'] | null>(null);

  const handleChange = (value: string) => {
    setRole(value as SignUpRole['value']);
  };

  const isCheckValid = role !== null;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow h-0 pt-[10vh] overflow-y-auto">
        <TextBanner
          hasLogo
          title="역할을 선택해주세요."
          description="멜로디켓 서비스는 블록체인을 사용한 서비스에요."
        />
        <div className="my-9 flex flex-col gap-4">
          {SIGN_UP_ROLE_DATAS.map((data) => (
            <SignUpRoleRadio
              key={data.key}
              title={data.title}
              description={data.description}
              value={data.value}
              name="role"
              checked={role === data.value}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
      <div className="my-4">
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

export default SignUpRoleSelect;
