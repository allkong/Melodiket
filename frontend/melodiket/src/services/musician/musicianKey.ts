import { User } from '@/types/user';

const musicianKey = {
  default: ['musician'],
  list: (options: {
    pageSize: number;
    orderKey: string;
    orderDirection: 'ASC' | 'DESC';
    query: string;
    user: User | null;
  }) => [...musicianKey.default, 'list', { ...options }],
  detail: (uuid: string) => [...musicianKey.default, 'detail', uuid],
  concerts: (options: {
    musicianUuid: string;
    pageSize: number;
    orderKey: string;
    orderDirection: 'ASC' | 'DESC';
  }) => [...musicianKey.default, 'concerts', { ...options }],
} as const;

export default musicianKey;
