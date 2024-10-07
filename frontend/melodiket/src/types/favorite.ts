import type { MusicianResponse } from './musician';

export interface FavoriteMusician {
  pageInfo: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    pageNo: number;
    requestedSize: number;
    responsedSize: number;
  };
  result: MusicianResponse[];
}
