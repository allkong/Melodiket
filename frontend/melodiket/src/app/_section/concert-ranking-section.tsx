'use client';

import ConcertRankingCard from '@/components/molecules/card/ConcertRankingCard';
import { useFetchConcertList } from '@/services/concert/fetchConcert';

const ConcertRankingSection = () => {
  const { data } = useFetchConcertList();
  const { pageInfo, result } = data ?? {};

  return (
    <>
      {pageInfo &&
        pageInfo?.responsedSize > 0 &&
        result?.map((concert, idx) => (
          <ConcertRankingCard
            key={concert.concertUuid}
            concertUuid={concert.concertUuid}
            location={concert.location}
            posterCid={concert.posterCid}
            ticketingAt={concert.ticketingAt}
            title={concert.title}
            ranking={idx + 1}
          />
        ))}
    </>
  );
};

export default ConcertRankingSection;
