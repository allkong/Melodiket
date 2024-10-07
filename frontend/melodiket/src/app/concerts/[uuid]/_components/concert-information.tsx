'use client';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import ThinDivider from '@/components/atoms/divider/ThinDivider';
import ConcertTitle from './concert-title';
import ConcertDetail from './concert-detail';
import MusiciansInformation from './musician-information';
import ConcertDescription from './concert-description';
import LargeButton from '@/components/atoms/button/LargeButton';
import { useRouter } from 'next/navigation';

interface ConcertInformationProps {
  uuid: string;
}

const ConcertInformation = ({ uuid }: ConcertInformationProps) => {
  const router = useRouter();

  const { data } = useFetchConcertDetail(uuid);
  const { result } = data!;

  const {
    title,
    stageName,
    description,
    musicians,
    ticketingAt,
    isAvailableSeat,
    ticketPrice,
    startAt,
    isStanding,
  } = result;

  return (
    <div className="relative w-full flex-grow h-fit px-7 pb-14 space-y-6">
      <div className="absolute w-full h-10 -top-5 left-0 right-0 bg-white rounded-2xl" />
      <ConcertTitle title={title} stageName={stageName} />
      <ThinDivider />
      <ConcertDetail
        isStanding={isStanding}
        isAvailableSeat={isAvailableSeat}
        ticketPrice={ticketPrice}
        startAt={startAt}
        ticketingAt={ticketingAt}
      />
      <ThinDivider />
      <MusiciansInformation musicians={musicians} />
      <ThinDivider />
      <ConcertDescription description={description} />
      <div className="fixed w-full max-w-xl bottom-0 left-1/2 -translate-x-1/2 px-6 py-3 bg-white">
        <LargeButton
          label="예매하기"
          onClick={() => router.push(`/concert/book/${uuid}`)}
        />
      </div>
    </div>
  );
};

export default ConcertInformation;
