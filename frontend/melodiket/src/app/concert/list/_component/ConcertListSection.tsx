'use client';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import { useFetchConcertList } from '@/services/concert/fetchConcert';

const ConcertListSection = () => {
  const { data } = useFetchConcertList();

  return (
    <>
      {data?.map((concert) => (
        <ConcertCard key={concert.concertId} {...concert} />
      ))}
    </>
  );
};

export default ConcertListSection;
