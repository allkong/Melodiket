import { useMutation } from '@tanstack/react-query';

import customFetch from '../customFetch';
import {
  GetMeResponse,
  UpdateMeRequest,
  UploadImageRequest,
  UploadImageResponse,
} from '@/types/user';
import toast from 'react-hot-toast';

const getMe = async () => {
  const response = await customFetch<GetMeResponse>('/users/me', {
    method: 'GET',
  });
  return response;
};

const updateMe = async (updateData: UpdateMeRequest) => {
  const response = await customFetch<GetMeResponse>('/users/me', {
    method: 'PATCH',
    body: updateData,
  });
  return response;
};

const uploadImage = async (uploadImageRequest: UploadImageRequest) => {
  const response = await customFetch<UploadImageResponse>(
    '/upload-image/presigned-url',
    {
      method: 'POST',
      body: uploadImageRequest,
    }
  );
  return response;
};

export const useUploadImage = () => {
  return useMutation<UploadImageResponse, Error, UploadImageRequest>({
    mutationFn: (uploadImageRequest) => uploadImage(uploadImageRequest),
    onError: () => {
      toast.error('이미지 업로드 실패!');
    },
  });
};

export const useGetMe = () => {
  return useMutation<GetMeResponse, Error>({
    mutationFn: () => getMe(),
    onError: () => {
      toast.error('정보 가져오기 실패!');
    },
  });
};

export const useUpdateMe = () => {
  return useMutation<GetMeResponse, Error, UpdateMeRequest>({
    mutationFn: (updateData) => updateMe(updateData),
    onError: () => {
      toast.error('정보 수정 실패!');
    },
    onSuccess: () => {
      toast.success('정보 수정 성공!');
    },
  });
};
