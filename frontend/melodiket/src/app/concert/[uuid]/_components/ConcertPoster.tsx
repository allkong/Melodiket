'use client';

import Image from 'next/image';

import DarkedImage from '@/components/atoms/image/DarkedImage';
import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import FavoriteButton from '@/components/atoms/button/FavoriteButton';

interface ConcertPosterProps {
  uuid: string;
}

const ConcertPoster = ({ uuid }: ConcertPosterProps) => {
  const { data } = useFetchConcertDetail(uuid);
  const { posterURL, title, location, favorite } = data!;

  return (
    <div className="relative w-full h-96">
      <DarkedImage src={posterURL} />
      <div className="absolute flex items-center justify-center w-full h-96 left-0 top-0 px-6 pt-20 pb-12 text-white">
        <div className="w-full h-full flex justify-between gap-5">
          <div className="relative w-[40vw] max-w-44 h-full flex-shrink-0">
            <Image
              src={posterURL}
              alt="콘서트 상세 정보"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div className="space-y-3">
              <p className="text-xl">{title}</p>
              <p className="text-xs">{location}</p>
            </div>
            <div className="flex gap-2 self-end text-sm">
              <p className="text-sm">{favorite}</p>
              <FavoriteButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertPoster;
