import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type {
  RegisterStageRequest,
  RegisterStageResponse,
} from '@/types/stage';

import customFetch from '../customFetch';

const registerStage = async (stageData: RegisterStageRequest) => {
  const response = await customFetch<RegisterStageResponse>('/stages', {
    method: 'POST',
    body: stageData,
  });
  return response;
};

export const useRegisterStage = () => {
  const router = useRouter();

  return useMutation<RegisterStageResponse, Error, RegisterStageRequest>({
    mutationFn: (StageData: RegisterStageRequest) => registerStage(StageData),
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      alert('스테이지 등록 실패!');
    },
  });
};
