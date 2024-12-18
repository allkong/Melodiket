import { useRouter, useSearchParams } from 'next/navigation';
import {
  Children,
  FC,
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

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
interface StepProps<T> {
  step?: T;
  children?: ReactNode;
}

const Step = <T,>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

const FunnelMain = <T,>() =>
  Object.assign(Funnel, {
    Step: Step<T>,
  });

interface UseFunnelReturn<T> {
  Funnel: FC<FunnelProps> & { Step: FC<StepProps<T>> };
  setStep: (step: T) => void;
}

/**
 *
 * @param addToHistory setStep으로 페이지 이동 시 브라우저 히스토리 추가 여부. default = false
 * @param preventForwardNavigate 뒤로 가기를 눌렀을 때 다시 앞으로 가는 것을 방지. default = false
 * @param initialStep 초기 페이지
 * @returns 현재 query string의 step에 해당하는 컴포넌트를 보여주는 Funnel 컴포넌트와 query string을 교체하는 setStep 함수
 */
const useFunnel = <T extends string>(options?: {
  addToHistory?: boolean;
  preventForwardNavigate?: boolean;
  initialStep?: T;
}): UseFunnelReturn<T> => {
  const {
    addToHistory = false,
    preventForwardNavigate = false,
    initialStep,
  } = options ?? {};

  const router = useRouter();
  const searchParams = useSearchParams();

  const addQueryString = useCallback(
    (step: T, addToHistory: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', step);

      if (addToHistory) {
        router.push(`?${params.toString()}`);
      } else {
        router.replace(`?${params.toString()}`);
      }
    },
    [addToHistory, router] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const setStep = useCallback(
    (step: T) => {
      addQueryString(step, addToHistory);
    },
    [addQueryString, addToHistory]
  );

  useEffect(() => {
    if (initialStep) {
      addQueryString(initialStep, false);
    }
  }, [initialStep, addQueryString]);

  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };

    if (preventForwardNavigate) {
      window.addEventListener('popstate', handlePopState);
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, [preventForwardNavigate]);

  return { Funnel: FunnelMain<T>(), setStep };
};

export default useFunnel;
