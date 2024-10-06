const photocardKey = {
  default: ['photocard'],
  list: () => [...photocardKey.default, 'list'],
  detail: (uuid: string) => [...photocardKey.default, 'detail', uuid],
} as const;

export default photocardKey;
