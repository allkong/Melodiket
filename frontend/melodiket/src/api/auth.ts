import customFetch from './customFetch';

export interface LoginRequest {
  loginId: string;
  password: string;
}

export const login = async (loginData: LoginRequest) => {
  const response = await customFetch('/auth/login', {
    method: 'POST',
    body: loginData,
  });

  return response;
};
