import { User } from '@/types/user';

const photocardKey = {
  default: ['photocard'],
  list: (user: User | null) => [...photocardKey.default, 'list', { ...user }],
  detail: (uuid: string) => [...photocardKey.default, 'detail', uuid],
} as const;

export default photocardKey;
