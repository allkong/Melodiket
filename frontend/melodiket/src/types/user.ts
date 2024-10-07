import { UUID } from 'crypto';

export interface GetMeResponse {
  uuid: UUID;
  loginId: string;
  role: string;
  nickname: string;
  description: string;
  imageUrl: string;
}
