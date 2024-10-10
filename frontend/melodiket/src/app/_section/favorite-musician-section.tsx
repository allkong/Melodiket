'use client';

import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import { useFetchFavoriteMusiciansList } from '@/services/favorite/fetchFavorite';
import { getCidUrl } from '@/utils/getUrl';
import NeedLogin from '../_components/need-login';
import NoMusician from '../_components/no-musician';
import useAuthStore from '@/store/authStore';
import { FavoriteMusician } from '@/types/favorite';
import { User } from '@/types/user';

const getComponent = (user: User | null, data?: FavoriteMusician) => {
  if (!user) {
    return <NeedLogin />;
  }

  if (!data || data?.pageInfo.responsedSize === 0) {
    return <NoMusician />;
  }

  return data.result.map((musician) => (
    <MusicianProfileCard
      key={musician.loginId}
      musicianName={musician.nickname}
      src={getCidUrl(musician.imageUrl)}
    />
  ));
};

const FavoriteMusicianSection = () => {
  const { data } = useFetchFavoriteMusiciansList();
  const { user } = useAuthStore();

  const show = getComponent(user, data);

  return <>{show}</>;
};

export default FavoriteMusicianSection;
