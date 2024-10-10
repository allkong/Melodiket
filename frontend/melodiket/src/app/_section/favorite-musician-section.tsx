'use client';

import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import { useFetchFavoriteMusiciansList } from '@/services/favorite/fetchFavorite';
import { getCidUrl, getS3Url } from '@/utils/getUrl';
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
      src={getS3Url(musician.imageUrl)}
    />
  ));
};

const FavoriteMusicianSection = () => {
  const { data } = useFetchFavoriteMusiciansList();
  const { user } = useAuthStore();

  console.log(data);

  const show = getComponent(user, data);

  return <div className="flex gap-2">{show}</div>;
};

export default FavoriteMusicianSection;
