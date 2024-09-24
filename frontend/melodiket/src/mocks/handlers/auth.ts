import { http, HttpResponse } from 'msw';

const users = [
  {
    loginId: 'mu123',
    password: 'qwer123',
    nickname: '아이유',
    role: 'MUSICIAN',
  },
];

export const auth = [
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
      return new HttpResponse(
        JSON.stringify({
          detailMessage: 'Unauthorized',
          detailCode: 'E401000',
          additionalInfo: '',
        }),
        { status: 401 }
      );
    }
  }),
];
