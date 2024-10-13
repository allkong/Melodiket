'use client';

import MusicianProfileCard from '@/components/molecules/profile/MusicianProfileCard';
import { useFetchFavoriteMusiciansList } from '@/services/favorite/fetchFavorite';
import { getS3Url } from '@/utils/getUrl';
import NeedLogin from '../_components/need-login';
import NoMusician from '../_components/no-musician';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';

const FavoriteMusicianSection = () => {
  const { data } = useFetchFavoriteMusiciansList();
  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) return <NeedLogin />;
  else if (!data || data?.pageInfo.responsedSize === 0) return <NoMusician />;

  return (
    <div className="flex gap-2">
      {data.result.map((musician) => (
        <MusicianProfileCard
          key={musician.loginId}
          musicianName={musician.nickname}
          src={getS3Url(musician.imageUrl)}
          onClick={() => router.push(`/musicians/${musician.uuid}`)}
        />
      ))}
    </div>
  );
};

export default FavoriteMusicianSection;
