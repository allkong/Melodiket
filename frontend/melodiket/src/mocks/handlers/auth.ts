import { LoginRequest } from '@/types/login';
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
  http.post<never, LoginRequest>('/auth/login', async ({ request }) => {
    const user: LoginRequest = await request.json();

    const loginUser = users.find(
      (u) => u.loginId === user?.loginId && u.password === user?.password
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
