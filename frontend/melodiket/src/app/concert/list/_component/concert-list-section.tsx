'use client';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import { useFetchConcertList } from '@/services/concert/fetchConcert';

const ConcertListSection = () => {
  const { data } = useFetchConcertList();
  const { result } = data ?? {};

  return (
    <>
      {result &&
        result?.map((concert) => (
          <ConcertCard key={concert.concertUuid} {...concert} />
        ))}
    </>
  );
};

export default ConcertListSection;
