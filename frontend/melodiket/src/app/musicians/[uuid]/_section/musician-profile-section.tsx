'use client';

import { useMusicianDetail } from '@/services/musician/fetchMusician';
import { useToggleFavoriteMusician } from '@/services/favorite/fetchFavorite';
import { getS3Url } from '@/utils/getUrl';

import BackgroundFrame from '@/components/atoms/image-frame/BackgroundFrame';
import FavoriteProfile from '@/components/molecules/profile/FavoriteProfile';
import { useEffect, useState } from 'react';

interface MusicianProfileSectionProps {
  musicianUuid: string;
}

const MusicianProfileSection = ({
  musicianUuid,
}: MusicianProfileSectionProps) => {
  const { data: musician } = useMusicianDetail(musicianUuid);
  const { mutate: toggleFavorite } = useToggleFavoriteMusician();

  const [isFavorite, setIsFavorite] = useState(musician?.isLike ?? false);
  const [likeCount, setLikeCount] = useState(musician?.likeCount ?? 0);

  const handleFavoriteToggle = async () => {
    toggleFavorite(musicianUuid, {
      onSuccess: (data) => {
        console.log(data.status);
        setIsFavorite(data.status);
        setLikeCount((prevCount) =>
          data.status ? prevCount + 1 : prevCount - 1
        );
      },
    });
  };

  return (
    <>
      <div className="relative mb-20">
        <BackgroundFrame src={getS3Url(musician?.imageUrl || '')} />
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2">
          <FavoriteProfile
            src={getS3Url(musician?.imageUrl || '')}
            size="lg"
            isFavorite={isFavorite}
            onClick={handleFavoriteToggle}
          />
          <div className="absolute bottom-0 right-0 transform translate-x-8">
            <p>{likeCount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mx-5">
        <h1 className="text-2xl font-semibold">{musician?.nickname}</h1>
        <div className="py-4 text-sm border-b w-full text-center">
          <p>{musician?.description}</p>
        </div>
      </div>
    </>
  );
};

export default MusicianProfileSection;
