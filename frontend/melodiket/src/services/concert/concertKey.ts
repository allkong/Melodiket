const concertKey = {
  default: ['concert'],
  list: () => [...concertKey.default, 'list'],
  carousel: () => [...concertKey.default, 'carousel'],
  detail: (uuid: string) => [...concertKey.default, 'detail', uuid],
  infinite: () => [...concertKey.list(), 'infinite'],
} as const;

export default concertKey;
