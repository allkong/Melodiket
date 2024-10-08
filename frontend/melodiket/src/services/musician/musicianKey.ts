const musicianKey = {
  default: ['musician'],
  list: () => [...musicianKey.default, 'list'],
  detail: (uuid: string) => [...musicianKey.default, 'detail', uuid],
} as const;

export default musicianKey;
