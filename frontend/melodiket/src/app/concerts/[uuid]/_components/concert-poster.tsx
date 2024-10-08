'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import { useToggleFavorite } from '@/services/favorite/fetchFavoriteMusiciansList';

import DarkedImage from '@/components/atoms/image/DarkedImage';
import FavoriteButton from '@/components/atoms/button/FavoriteButton';

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
  const { data } = useFetchConcertDetail(uuid);
  const { result } = data!;
  const {
    posterCid,
    title,
    stageName,
    isFavorite: initialIsFavorite,
    favorites = 0,
  } = result;
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const mutate = useToggleFavorite();

  const handleToggleFavorite = async () => {
    const response = await mutate.mutateAsync({ concertUuid: uuid });
    setIsFavorite(response.isFavorite);
    toast(`좋아요 목록에 ${response.isFavorite ? '추가' : '삭제'}하였습니다.`, {
      icon: '👍',
    });
  };

  return (
    <div className="relative w-full h-96">
      <DarkedImage src={posterCid ?? '/'} />
      <div className="absolute flex items-center justify-center w-full h-96 left-0 top-0 px-6 pt-20 pb-12 text-white">
        <div className="w-full h-full flex justify-between gap-5">
          <div className="relative w-[40vw] max-w-44 h-full flex-shrink-0">
            <Image
              src={posterCid ?? '/'}
              alt="콘서트 상세 정보"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div className="space-y-3">
              <p className="text-xl">{title}</p>
              <p className="text-xs">{stageName}</p>
            </div>
            <div className="flex gap-2 self-end text-sm">
              <p className="text-sm">
                {getFavorites(initialIsFavorite, isFavorite, favorites)}
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
