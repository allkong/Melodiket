'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { SignUpData, SignUpRole } from '@/types/signUp';
import SignUpPolicy from './_components/sign-up-policy';
import SignUpRoleSelect from './_components/sign-up-role-select';
import SignUpInformation from './_components/sign-up-information';
import SignUpDescription from './_components/sign-up-description';
import SignUpSuccess from './_components/sign-up-success';

const Page = () => {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    nickname: '',
    loginId: '',
    password: '',
    role: 'AUDIENCE',
    description: '',
  });
  const [step, setStep] = useState<
    'POLICY' | 'ROLE' | 'INFORMATION' | 'DESCRIPTION' | 'SUCCESS'
  >('POLICY');

  const router = useRouter();

  return (
    <>
      {step === 'POLICY' && <SignUpPolicy onNext={() => setStep('ROLE')} />}
      {step === 'ROLE' && (
        <SignUpRoleSelect
          onNext={(value: SignUpRole['value']) => {
            setSignUpData((prev) => ({ ...prev, role: value }));
            setStep('INFORMATION');
          }}
        />
      )}
      {step === 'INFORMATION' && (
        <SignUpInformation
          onNext={(value: Omit<SignUpData, 'role' | 'description'>) => {
            setSignUpData((prev) => ({ ...prev, ...value }));
            setStep('DESCRIPTION');
          }}
        />
      )}
      {step === 'DESCRIPTION' && (
        <SignUpDescription
          onNext={(value) => {
            const data: SignUpData = { ...signUpData, description: value };
            console.log(data); // 서버에 mutate 요청 및 로딩 처리
            setStep('SUCCESS');
          }}
        />
      )}
      {step === 'SUCCESS' && (
        <SignUpSuccess
          onNext={() => {
            router.push('/auth/login');
          }}
        />
      )}
    </>
  );
};

export default Page;
