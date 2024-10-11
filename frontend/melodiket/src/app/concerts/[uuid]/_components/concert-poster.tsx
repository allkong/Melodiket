'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import { useToggleFavoriteConcert } from '@/services/favorite/fetchFavorite';
import { getCidUrl } from '@/utils/getUrl';

import DarkedImage from '@/components/atoms/image/DarkedImage';
import FavoriteButton from '@/components/atoms/button/FavoriteButton';
import useAuthStore from '@/store/authStore';

interface ConcertPosterProps {
  uuid: string;
}

const getFavorites = (
  initialFavorite: boolean,
  favorite: boolean,
  number: number
) => {
  if (initialFavorite && !favorite) {
    return number - 1;
  } else if (!initialFavorite && favorite) {
    return number + 1;
  }
  return number;
};

const ConcertPoster = ({ uuid }: ConcertPosterProps) => {
  const { data: concert } = useFetchConcertDetail(uuid);
  const mutate = useToggleFavoriteConcert();
  const { user } = useAuthStore();

  const [isFavorite, setIsFavorite] = useState<boolean>(
    concert?.isLike ?? false
  );

  const handleToggleFavorite = async () => {
    if (!user) {
      toast('로그인이 필요한 서비스예요', { icon: `😥` });
      return;
    } else if (user.role !== 'AUDIENCE') {
      toast('관객만 좋아요를 누를 수 있어요', { icon: `😥` });
      return;
    }
    const response = await mutate.mutateAsync({ concertUuid: uuid });

    setIsFavorite(response.isLike);
    if (response.isLike) {
      toast('찜 추가', {
        icon: '💜',
      });
    } else {
      toast('찜 제거', {
        icon: '🤍',
      });
    }
  };

  useEffect(() => {
    setIsFavorite(concert?.isLike ?? false);
  }, [concert]);

  return (
    <div className="relative w-full h-96">
      <DarkedImage src={getCidUrl(concert?.posterCid || '')} />
      <div className="absolute flex items-center justify-center w-full h-96 left-0 top-0 px-6 pt-20 pb-12 text-white">
        <div className="w-full h-full flex justify-between gap-5">
          <div className="relative w-[40vw] max-w-44 h-full flex-shrink-0">
            <Image
              src={getCidUrl(concert?.posterCid || '')}
              alt="콘서트 상세 정보"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div className="space-y-3">
              <p className="text-xl">{concert?.title}</p>
              <p className="text-xs">{concert?.stageName}</p>
            </div>
            <div className="flex gap-2 self-end text-sm">
              <p>
                {getFavorites(
                  concert?.isLike ?? false,
                  isFavorite,
                  concert?.likeCount ?? 0
                )}
              </p>
              <FavoriteButton
                isOn={isFavorite}
                onClick={handleToggleFavorite}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertPoster;
