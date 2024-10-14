import { SORT_OPTIONS } from '@/constants/controlOptions';
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
    title,
    user,
    isNowBooking,
    currentSort,
  }: {
    pageSize: number;
    title: string;
    user: User | null;
    isNowBooking: boolean;
    currentSort: keyof typeof SORT_OPTIONS;
  }) => [
    ...concertKey.list(),
    'infinite',
    pageSize,
    title,
    user ? `${user.nickname}${user.role}` : 'null',
    `${isNowBooking ? 'true' : 'false'}`,
    currentSort,
  ],
} as const;

export default concertKey;
