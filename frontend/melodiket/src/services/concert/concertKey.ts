import { User } from '@/types/user';

const concertKey = {
  default: ['concert'],
  list: () => [...concertKey.default, 'list'],
  carousel: () => [...concertKey.default, 'carousel'],
  detail: (uuid: string, user: User | null) => [
    ...concertKey.default,
    'detail',
    uuid,
    user ? `${user.nickname}${user.role}` : 'null',
  ],
  infinite: ({
    pageSize,
    orderKey,
    orderDirection,
    title,
    user,
  }: {
    pageSize: number;
    orderKey: string;
    orderDirection: 'ASC' | 'DESC';
    title: string;
    user: User | null;
  }) => [
    ...concertKey.list(),
    'infinite',
    pageSize,
    orderKey,
    orderDirection,
    title,
    user ? `${user.nickname}${user.role}` : 'null',
  ],
} as const;

export default concertKey;
