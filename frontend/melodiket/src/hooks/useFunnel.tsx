import { useRouter, useSearchParams } from 'next/navigation';
import { Children, FC, isValidElement, ReactNode } from 'react';

// Funnel UI를 보여주는 컴포넌트
interface FunnelProps {
  children: ReactNode;
}

const Funnel = ({ children }: FunnelProps) => {
  'use client';
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  const currentStep: ReactNode | null = Children.toArray(children).filter(
    (child) =>
      isValidElement(child) &&
      child.type === (<Step />).type &&
      child.props.step === step
  );

  return <>{currentStep}</>;
};

// 각 Funnel의 Step이 되는 컴포넌트
interface StepProps {
  step?: string;
  children?: ReactNode;
}

const Step = ({ children }: StepProps) => {
  return <>{children}</>;
};

const FunnelMain = Object.assign(Funnel, {
  Step,
});

interface UseFunnelReturn<T> {
  Funnel: FC<FunnelProps> & { Step: FC<StepProps> };
  setStep: (step: T) => void;
}

/**
 * @param addToHistory setStep으로 페이지 이동 시 브라우저 히스토리 추가 여부, default는 false
 * @returns 현재 query string의 step에 해당하는 컴포넌트를 보여주는 Funnel 컴포넌트와 query string을 교체하는 setStep 함수
 */
const useFunnel = <T extends string>(
  addToHistory: boolean = false
): UseFunnelReturn<T> => {
  'use client';
  const router = useRouter();
  const searchParams = useSearchParams();

  const addQueryString = (step: T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', step);

    if (addToHistory) {
      router.push(`?${params.toString()}`);
    } else {
      router.replace(`?${params.toString()}`);
    }
  };

  return { Funnel: FunnelMain, setStep: addQueryString };
};

export default useFunnel;
