import { ApprovalRequest } from '@/types/approval';
import customFetch from '../customFetch';
import { useMutation } from '@tanstack/react-query';

const approvalConcert = async (
  id: string,
  approvalRequest: ApprovalRequest
): Promise<void> => {
  await customFetch(`/concerts/${id}/approve`, {
    method: 'POST',
    body: approvalRequest,
  });
};

const denyConcert = async (id: string): Promise<void> => {
  await customFetch(`/concerts/${id}/deny`, {
    method: 'POST',
  });
};

export const useDenyConcert = () => {
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => denyConcert(id),
    onError: () => {
      alert('공연 거부 실패!');
    },
  });
};

export const useApprovalConcert = () => {
  return useMutation<
    void,
    Error,
    { id: string; approvalRequest: ApprovalRequest }
  >({
    mutationFn: ({ id, approvalRequest }) =>
      approvalConcert(id, approvalRequest),
    onSuccess: () => {
      alert('공연 승인 성공!');
    },
    onError: () => {
      alert('공연 승인 실패!');
    },
  });
};
