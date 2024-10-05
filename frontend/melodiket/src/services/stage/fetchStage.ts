import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type {
  RegisterSeatingStageRequest,
  RegisterStandingStageRequest,
  RegisterStageResponse,
  GetStagesResponse,
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

const getMyStages = async () => {
  const response = await customFetch<GetStagesResponse>('/stages/me', {
    method: 'GET',
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
      alert('스탠딩 스테이지 등록 실패!');
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

export const useGetMyStages = () => {
  return useMutation<GetStagesResponse, Error>({
    mutationFn: () => getMyStages(),
    onError: () => {
      alert('공연장 목록 가져오기 실패!');
    },
  });
};
