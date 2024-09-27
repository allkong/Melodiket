'use client';

import ConcertRankingCard from '@/components/molecules/card/ConcertRankingCard';
import { useFetchConcertList } from '@/services/concert/fetchConcert';

const ConcertRankingSection = () => {
  const { data } = useFetchConcertList();

  return (
    <>
      {data?.map((concert, idx) => (
        <ConcertRankingCard
          key={concert.concertId}
          concertId={concert.concertId}
          location={concert.location}
          posterURL={concert.posterURL}
          ticketingAt={concert.ticketingAt}
          title={concert.title}
          ranking={idx + 1}
        />
      ))}
    </>
  );
};

export default ConcertRankingSection;
