'use client';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import { FetchFavoriteResponse } from '@/types/concert';
import { RefetchOptions } from '@tanstack/react-query';

interface FavoriteConcertProps {
  data?: FetchFavoriteResponse[];
  refetch?: (options?: RefetchOptions) => void;
}

const FavoriteConcert = ({ data, refetch }: FavoriteConcertProps) => {
  return (
    <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 place-items-center w-full mt-7">
      {data?.map((concert) => (
        <ConcertCard
          key={concert.concertUuid}
          onClickFavorite={() => refetch?.()}
          isFavorite={concert.isLike}
          href={`/concerts/${concert.concertUuid}`}
          {...concert}
          ticketingAt={concert.ticketingAt}
        />
      ))}
    </div>
  );
};

export default FavoriteConcert;
