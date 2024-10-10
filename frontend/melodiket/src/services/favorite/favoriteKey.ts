import { User } from '@/types/user';

const favoriteKey = {
  default: ['favorite'],
  musicians: (user: User | null) => [
    ...favoriteKey.default,
    'musicians',
    user ? `${user.nickname}${user.role}` : 'null',
  ],
  concerts: (user: User | null) => [
    ...favoriteKey.default,
    'concerts',
    user ? `${user.nickname}${user.role}` : 'null',
  ],
} as const;

export default favoriteKey;
