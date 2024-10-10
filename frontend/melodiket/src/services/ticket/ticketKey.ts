import type { User } from '@/types/user';

const ticketKey = {
  default: ['concert'],
  list: (user: User | null) => [
    ...ticketKey.default,
    'list',
    user ? `${user.nickname}${user.role}` : 'null',
  ],
  detail: (uuid: string) => [...ticketKey.default, 'detail', uuid],
  use: (uuid: string) => [...ticketKey.default, 'use', uuid],
} as const;

export default ticketKey;
