import { SORT_OPTIONS } from '@/constants/controlOptions';
import { User } from '@/types/user';

const musicianKey = {
  default: ['musician'],
  list: () => [...musicianKey.default, 'list'],
  infinite: (options: {
    pageSize: number;
    query: string;
    user: User | null;
    currentSort: keyof typeof SORT_OPTIONS;
  }) => [...musicianKey.list(), 'infinite', { ...options }],
  detail: (uuid: string) => [...musicianKey.default, 'detail', uuid],
  concerts: (options: {
    musicianUuid: string;
    pageSize: number;
    orderKey: string;
    orderDirection: 'ASC' | 'DESC';
  }) => [...musicianKey.default, 'concerts', { ...options }],
} as const;

export default musicianKey;
