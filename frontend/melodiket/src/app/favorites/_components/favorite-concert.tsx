import ConcertCard from '@/components/molecules/card/ConcertCard';

const FavoriteConcert = () => {
  return (
    <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-3 place-items-center w-full mt-7">
      {Array.from({ length: 7 }, () => 0).map((_, idx) => (
        <ConcertCard
          key={idx}
          concertUuid="12"
          location="종합운동장"
          posterCid="https://i.namu.wiki/i/DiRZTq4yBGq81-IgMuSglVAC_1pOoJG1EkJFwknd-DxFEBWo_XAHU4cIx-rPa_t82wnGgxkrVoQ_WeGRStW_cQ.webp"
          ticketingAt="2024.03.06"
          title="빈지노"
        />
      ))}
    </div>
  );
};

export default FavoriteConcert;
