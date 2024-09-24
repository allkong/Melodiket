import useAuthStore from '@/store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const accessToken = useAuthStore.getState().accessToken;

type JsonRequestInit = Omit<NonNullable<RequestInit>, 'body'> & {
  body?: object;
};

const customFetch = async <T>(url: string, options?: JsonRequestInit) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
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
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default customFetch;
