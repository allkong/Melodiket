import { http, HttpResponse } from 'msw';
import { delay } from './index';

const users = [
  {
    loginId: 'mu123',
    password: 'qwer123',
    nickname: '아이유',
    role: 'MUSICIAN',
  },
];

export const accountInfo = [
  http.post('/auth/login', async ({ request }) => {
    const user = await request.json();

    const { loginId, password } = user;

    const loginUser = users.find(
      (u) => u.loginId === loginId && u.password === password
    );

    if (loginUser) {
      return HttpResponse.json({
        accessToken: 'afdsfsdfsd',
        nickname: loginUser.nickname,
        role: loginUser.role,
      });
    } else {
      return HttpResponse.json({
        detailMessage: 'Unauthorized',
        detailCode: 'E401000',
        additionalInfo: '',
      });
    }
  }),
  http.get('/users/musicians', async () => {
    await delay(3000);
    return HttpResponse.json({
      result: [
        {
          id: 1,
          nickname: '아이브',
          imageUrl: '',
        },
        {
          id: 2,
          nickname: '뉴진스',
          imageUrl: '',
        },
      ],
    });
  }),
];
