export interface PageParam {
  isFirstPage: boolean;
  lastUuid?: string;
}

export interface Musician {
  musicianUuid: string;
  name: string;
  imageUrl: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  requestedSize: number;
  responsedSize: number;
  lastUuid: string;
}

export interface FetchMusiciansResponse {
  pageInfo: PageInfo;
  result: Musician[];
}

export interface MusicianResponse {
  loginId: string;
  role: 'MUSICIAN';
  nickname: string;
  description: string;
  imageUrl: string;
}
