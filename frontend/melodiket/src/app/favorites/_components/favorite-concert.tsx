'use client';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import { useFetchFavoriteConcert } from '@/services/favorite/fetchFavorite';

const FavoriteConcert = () => {
  const { data, refetch } = useFetchFavoriteConcert();
  const { result } = data ?? {};

  return (
    <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 place-items-center w-full mt-7">
      {result?.map((concert) => (
        <ConcertCard
          key={concert.concertUuid}
          onClickFavorite={refetch}
          {...concert}
        />
      ))}
    </div>
  );
};

export default FavoriteConcert;
