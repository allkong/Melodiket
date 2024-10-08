'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import { useToggleFavoriteConcert } from '@/services/favorite/fetchFavorite';
import { getCidUrl } from '@/utils/getUrl';

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
  const { data: concert } = useFetchConcertDetail(uuid);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    concert?.isLike ?? false
  );
  const mutate = useToggleFavoriteConcert();

  const handleToggleFavorite = async () => {
    const response = await mutate.mutateAsync({ concertUuid: uuid });
    setIsFavorite(response.isFavorite);
    toast(`찜 ${response.isFavorite ? '추가' : '제거'}`, {
      icon: '💜',
    });
  };

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
                {concert?.likeCount}
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
