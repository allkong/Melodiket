const concertKey = {
  default: ['concert'],
  list: () => [...concertKey.default, 'list'],
  carousel: () => [...concertKey.default, 'carousel'],
  detail: (uuid: string) => [...concertKey.default, 'detail', uuid],
  infinite: ({
    pageSize,
    orderKey,
    orderDirection,
    title,
  }: {
    pageSize: number;
    orderKey: string;
    orderDirection: 'ASC' | 'DESC';
    title: string;
  }) => [
    ...concertKey.list(),
    'infinite',
    pageSize,
    orderKey,
    orderDirection,
    title,
  ],
} as const;

export default concertKey;
