const concertKey = {
  default: ['concert'],
  list: () => [...concertKey.default, 'list'],
  carousel: () => [...concertKey.default, 'carousel'],
  detail: (uuid: string) => [...concertKey.default, 'detail', uuid],
} as const;

export default concertKey;
