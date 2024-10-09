const ticketKey = {
  default: ['concert'],
  list: () => [...ticketKey.default, 'list'],
  detail: (uuid: string) => [...ticketKey.default, 'detail', uuid],
  use: (uuid: string) => [...ticketKey.default, 'use', uuid],
} as const;

export default ticketKey;
