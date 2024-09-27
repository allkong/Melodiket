const concertKey = {
  default: ['concert'],
  list: () => [...concertKey.default, 'list'],
} as const;

export default concertKey;
