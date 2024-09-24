const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const accessToken = '';
// RequestInit
type JsonRequestInit = Omit<NonNullable<RequestInit>, 'body'> & {
  body?: object;
};

const customFetch = async (url: string, options: JsonRequestInit) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  //   const processedBody =
  //     options.body && typeof options.body === 'object'
  //       ? JSON.stringify(options.body)
  //       : options.body;

  const fetchOptions: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    method: options.method || 'GET',
    ...options,
    body: options.body && JSON.stringify(options.body),
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export default customFetch;
