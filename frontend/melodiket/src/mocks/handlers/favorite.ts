import { FavoriteMusician } from '@/types/favorite';
import { http, HttpResponse } from 'msw';
import { delay } from '.';

const FAVORITE_MUSICIAN_LIST: FavoriteMusician[] = [
  {
    id: 0,
    musicianName: '아이묭',
    src: 'https://i1.sndcdn.com/artworks-Dq5srslWYpDO1H0j-cTCo1w-t500x500.jpg',
  },
  {
    id: 1,
    musicianName: 'hitsujibungaku',
    src: 'https://i.pinimg.com/236x/65/3b/f5/653bf5ae181cab407c7cbd5c616672a6.jpg',
  },
  {
    id: 2,
    musicianName: '빈지노',
    src: 'https://img.hankyung.com/photo/202103/01.25846226.3.jpg',
  },
  {
    id: 3,
    musicianName: '김장훈',
    src: 'https://newsimg-hams.hankookilbo.com/2022/08/13/601df9d2-7c82-4b2d-bdd1-dc0bcc2e81e4.jpg',
  },
];

export const favorite = [
  http.get<never, null, FavoriteMusician[], '/api/v1/musicians/liked/me'>(
    '/api/v1/musicians/liked/me',
    async () => {
      await delay(1500);
      return HttpResponse.json(FAVORITE_MUSICIAN_LIST);
    }
  ),
];
