import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type {
  RegisterSeatingStageRequest,
  RegisterStandingStageRequest,
  RegisterStageResponse,
} from '@/types/stage';

import customFetch from '../customFetch';

const registerStandingStage = async (
  stageData: RegisterStandingStageRequest
) => {
  const response = await customFetch<RegisterStageResponse>(
    '/stages/standing',
    {
      method: 'POST',
      body: stageData,
    }
  );
  return response;
};

const registerSeatingStage = async (stageData: RegisterSeatingStageRequest) => {
  const response = await customFetch<RegisterStageResponse>('/stages/seating', {
    method: 'POST',
    body: stageData,
  });
  return response;
};

export const useRegisterStandingStage = () => {
  const router = useRouter();

  return useMutation<
    RegisterStageResponse,
    Error,
    RegisterStandingStageRequest
  >({
    mutationFn: (stageData: RegisterStandingStageRequest) =>
      registerStandingStage(stageData),
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      alert('스탠딩 스테이지 등록 실��!');
    },
  });
};

export const useRegisterSeatingStage = () => {
  const router = useRouter();

  return useMutation<RegisterStageResponse, Error, RegisterSeatingStageRequest>(
    {
      mutationFn: (StageData: RegisterSeatingStageRequest) =>
        registerSeatingStage(StageData),
      onSuccess: () => {
        router.push('/');
      },
      onError: () => {
        alert('좌석 스테이지 등록 실패!');
      },
    }
  );
};
