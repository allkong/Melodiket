'use client';

import ConcertRankingCard from '@/components/molecules/card/ConcertRankingCard';
import { useFetchConcertList } from '@/services/concert/fetchConcert';
import { getCidUrl } from '@/utils/getUrl';

const ConcertRankingSection = () => {
  const { data } = useFetchConcertList();
  const { pageInfo, result } = data ?? {};

  return (
    <>
      {pageInfo &&
        pageInfo?.responsedSize > 0 &&
        result
          ?.slice()
          .map((concert, idx) => (
            <ConcertRankingCard
              key={`${concert.concertUuid}-${concert.posterCid}`}
              concertUuid={concert.concertUuid}
              stageName={concert.stageName}
              posterCid={getCidUrl(concert.posterCid)}
              ticketingAt={concert.ticketingAt}
              title={concert.title}
              ranking={idx + 1}
              href={`/concerts/${concert.concertUuid}`}
            />
          ))}
    </>
  );
};

export default ConcertRankingSection;
