import { SORT_OPTIONS } from '@/constants/controlOptions';

export interface PageParam {
  isFirstPage: boolean;
  pageSize: number;
  lastUuid?: string;
  orderKey?: string;
  orderDirection?: 'ASC' | 'DESC';
  query?: string;
  currentSort?: keyof typeof SORT_OPTIONS;
}

export interface Musician {
  musicianUuid: string;
  name: string;
  imageUrl: string;
  approvalStatus: 'APPROVED' | 'PENDING' | 'DENIED';
}

export interface MusicianListItem {
  uuid: string;
  loginId: string;
  role: string;
  nickname: string;
  description: string;
  registeredAt: string;
  imageUrl?: string;
  likeCount: number;
  isLike: boolean;
}

export interface PageInfo {
  hasNextPage: boolean;
  requestedSize: number;
  responsedSize: number;
  lastUuid: string;
}

export interface FetchMusiciansResponse {
  pageInfo: PageInfo;
  result: MusicianListItem[];
}

export interface MusicianDetail {
  uuid: string;
  loginId: string;
  role: 'ROLE_MUSICIAN';
  nickname: string;
  description: string;
  registeredAt: string;
  imageUrl: string;
  likeCount: number;
  isLike: boolean;
}

export interface ConcertByMusicianRequest {
  musicianUuid: string;
  isNowBooking: boolean;
  currentSort: keyof typeof SORT_OPTIONS;
  isFirstPage?: boolean;
  lastUuid?: string;
  pageSize?: number;
  orderKey?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface ConcertByMusicianResponse {
  pageInfo: PageInfo;
  result: ConcertByMusician[];
}

export interface ConcertByMusician {
  concertUuid: string;
  stageUuid: string;
  title: string;
  createdAt: string;
  startAt: string;
  ticketingAt: string;
  posterCid: string;
  stageName: string;
  isLike: boolean;
}
