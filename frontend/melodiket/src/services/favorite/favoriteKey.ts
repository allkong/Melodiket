const favoriteKey = {
  default: ['favorite'],
  musicians: () => [...favoriteKey.default, 'musicians'],
} as const;

export default favoriteKey;
