const concertKey = {
  default: ['concert'],
  list: () => [...concertKey.default, 'list'],
  carousel: () => [...concertKey.default, 'carousel'],
} as const;

export default concertKey;
