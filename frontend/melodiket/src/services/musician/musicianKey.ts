const musicianKey = {
  default: ['musician'],
  list: (options: {
    pageSize: number;
    orderKey: string;
    orderDirection: 'ASC' | 'DESC';
    query: string;
  }) => [...musicianKey.default, 'list', { ...options }],
  detail: (uuid: string) => [...musicianKey.default, 'detail', uuid],
} as const;

export default musicianKey;
