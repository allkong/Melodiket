'use client';

import ConcertRankingCard from '@/components/molecules/card/ConcertRankingCard';
import useConcertList from '@/services/concert/fetchConcertList';

const ConcertRankingSection = () => {
  const { data: datas } = useConcertList();

  return (
    <>
      {datas &&
        datas.map((data, idx) => (
          <ConcertRankingCard
            key={data.concertId}
            {...data}
            ranking={idx + 1}
          />
        ))}
    </>
  );
};

export default ConcertRankingSection;
