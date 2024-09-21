'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { SignUpData, SignUpRole } from '@/types/signUp';
import PolicySection from '@/components/organisms/section/SignUpPolicySection';
import RoleSection from '@/components/organisms/section/SignUpRoleSection';
import InformationSection from '@/components/organisms/section/SignUpInformationSection';
import DescriptionSection from '@/components/organisms/section/SignUpDescriptionSection';
import SuccessSection from '@/components/organisms/section/SignUpSuccessSection';

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
      {step === 'POLICY' && <PolicySection onNext={() => setStep('ROLE')} />}
      {step === 'ROLE' && (
        <RoleSection
          onNext={(value: SignUpRole['value']) => {
            setSignUpData((prev) => ({ ...prev, role: value }));
            setStep('INFORMATION');
          }}
        />
      )}
      {step === 'INFORMATION' && (
        <InformationSection
          onNext={(value: Omit<SignUpData, 'role' | 'description'>) => {
            setSignUpData((prev) => ({ ...prev, ...value }));
            setStep('DESCRIPTION');
          }}
        />
      )}
      {step === 'DESCRIPTION' && (
        <DescriptionSection
          onNext={(value) => {
            const data: SignUpData = { ...signUpData, description: value };
            console.log(data); // 서버에 mutate 요청 및 로딩 처리
            setStep('SUCCESS');
          }}
        />
      )}
      {step === 'SUCCESS' && (
        <SuccessSection
          onNext={() => {
            router.push('/auth/login');
          }}
        />
      )}
    </>
  );
};

export default Page;
