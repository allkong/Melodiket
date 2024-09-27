import { http, HttpResponse } from 'msw';
import { delay } from './index';

export const accountInfo = [
  http.get('/users/musicians', async () => {
    await delay(3000);
    return HttpResponse.json({
      result: [
        {
          id: 0,
          nickname: '아이브',
          imageUrl: '',
        },
        {
          id: 1,
          nickname: '뉴진스',
          imageUrl: '',
        },
      ],
    });
  }),
];
