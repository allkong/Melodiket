'use client';

import ConcertCard from '@/components/molecules/card/ConcertCard';
import useConcertList from '@/services/concert/useConcertList';

const ConcertListSection = () => {
  const { data: datas } = useConcertList();

  return (
    <>
      {datas.map((concert) => (
        <ConcertCard key={concert.concertId} {...concert} />
      ))}
    </>
  );
};

export default ConcertListSection;
