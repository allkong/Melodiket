'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { SignUpData, SignUpRole } from '@/types/signUp';
import SignUpPolicy from './_section/sign-up-policy';
import SignUpRoleSelect from './_section/sign-up-role-select';
import SignUpInformation from './_section/sign-up-information';
import SignUpDescription from './_section/sign-up-description';
import SignUpSuccess from './_section/sign-up-success';
import useFunnel from '@/hooks/useFunnel';
import { useSignUp } from '@/services/auth/fetchAuth';
import useSpinner from '@/hooks/useSpinner';

const Page = () => {
  const { Funnel, setStep } = useFunnel<
    'policy' | 'role' | 'information' | 'description' | 'success'
  >({
    addToHistory: true,
    preventForwardNavigate: true,
    initialStep: 'policy',
  });

  const [signUpData, setSignUpData] = useState<SignUpData>({
    nickname: '',
    name: '',
    loginId: '',
    password: '',
    role: 'audience',
    description: '',
  });

  const router = useRouter();

  const signUpMutate = useSignUp();
  useSpinner(signUpMutate.isPending);

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
