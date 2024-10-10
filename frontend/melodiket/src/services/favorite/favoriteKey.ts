import { User } from '@/types/user';

const favoriteKey = {
  default: ['favorite'],
  musicians: () => [...favoriteKey.default, 'musicians'],
  concerts: (user: User | null) => [
    ...favoriteKey.default,
    'concerts',
    user ? `${user.nickname}${user.role}` : 'null',
  ],
} as const;

export default favoriteKey;
