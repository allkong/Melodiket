import { FavoriteMusician } from '@/types/favorite';
import { BEFORE_LOGIN_FAVORITE_MUSICIANS } from '@/constants/signUp';
import { delay, http, HttpResponse } from 'msw';

const FAVORITE_MUSICIAN_LIST: FavoriteMusician = {
  pageInfo: {
    hasNextPage: false,
    hasPrevPage: false,
    pageNo: 0,
    requestedSize: 0,
    responsedSize: 10,
  },
  result: [...BEFORE_LOGIN_FAVORITE_MUSICIANS],
};

export const favorite = [
  http.get<never, null, FavoriteMusician, '/musicians/liked/me'>(
    '/musicians/liked/me',
    async () => {
      await delay(1500);
      return HttpResponse.json(FAVORITE_MUSICIAN_LIST);
    }
  ),
];
