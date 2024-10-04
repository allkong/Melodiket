'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { SignUpData, SignUpRole } from '@/types/signUp';
import SignUpPolicy from './_components/sign-up-policy';
import SignUpRoleSelect from './_components/sign-up-role-select';
import SignUpInformation from './_components/sign-up-information';
import SignUpDescription from './_components/sign-up-description';
import SignUpSuccess from './_components/sign-up-success';
import useFunnel from '@/hooks/useFunnel';
import { useSignUp } from '@/services/auth/useLogin';

const Page = () => {
  const { Funnel, setStep } = useFunnel<
    'policy' | 'role' | 'information' | 'description' | 'success'
  >(false, true, 'policy');

  const [signUpData, setSignUpData] = useState<SignUpData>({
    nickname: '',
    loginId: '',
    password: '',
    role: 'audience',
    description: '',
  });

  const router = useRouter();

  const signUpMutate = useSignUp();

  return (
    <Funnel>
      <Funnel.Step step="policy">
        <SignUpPolicy onNext={() => setStep('role')} />
      </Funnel.Step>
      <Funnel.Step step="role">
        <SignUpRoleSelect
          onNext={(value: SignUpRole['value']) => {
            setSignUpData((prev) => ({ ...prev, role: value }));
            setStep('information');
          }}
        />
      </Funnel.Step>
      <Funnel.Step step="information">
        <SignUpInformation
          onNext={(value: Omit<SignUpData, 'role' | 'description'>) => {
            setSignUpData((prev) => ({ ...prev, ...value }));
            setStep('description');
          }}
        />
      </Funnel.Step>
      <Funnel.Step step="description">
        <SignUpDescription
          onNext={async (value) => {
            const data: SignUpData = { ...signUpData, description: value };
            await signUpMutate.mutateAsync({ body: data });
            setStep('success');
          }}
        />
      </Funnel.Step>
      <Funnel.Step step="success">
        <SignUpSuccess
          onNext={() => {
            router.push('/auth/login');
          }}
        />
      </Funnel.Step>
    </Funnel>
  );
};

export default Page;
