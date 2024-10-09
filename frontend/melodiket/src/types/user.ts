import { UUID } from 'crypto';

export interface User {
  nickname: string | null;
  role: string | null;
}
export interface GetMeResponse {
  uuid: UUID;
  loginId: string;
  role: string;
  nickname: string;
  description: string;
  imageUrl: string;
}

export interface UpdateMeRequest {
  nickname?: string;
  description?: string;
  imageUrl?: string;
}

export interface UploadImageRequest {
  type?: string;
  fileName: string;
}

export interface UploadImageResponse {
  presigned: string;
  cdn: string;
}
