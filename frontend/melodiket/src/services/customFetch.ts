import useAuthStore from '@/store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type JsonRequestInit = Omit<NonNullable<RequestInit>, 'body'> & {
  body?: object;
};

const customFetch = async <T>(
  url: string,
  options?: JsonRequestInit
): Promise<T> => {
  const accessToken = useAuthStore.getState().accessToken;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const fetchOptions: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
    method: options?.method || 'GET',
    ...options,
    body: options?.body && JSON.stringify(options?.body),
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw { status: response.status, ...errorResponse };
    }

    const responseText = await response.text();
    return responseText ? JSON.parse(responseText) : null;
  } catch (error) {
    throw error;
  }
};

export default customFetch;
