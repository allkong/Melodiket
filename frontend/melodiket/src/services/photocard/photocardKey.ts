const photocardKey = {
  default: ['photocard'],
  list: () => [...photocardKey.default, 'list'],
} as const;

export default photocardKey;
