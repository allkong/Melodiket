'use client';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import ThinDivider from '@/components/atoms/divider/ThinDivider';
import ConcertTitle from './ConcertTitle';
import ConcertDetail from './ConcertDetail';
import MusiciansInformation from './MusiciansInformation';
import ConcertDescription from './ConcertDescription';
import LargeButton from '@/components/atoms/button/LargeButton';
import { useRouter } from 'next/navigation';

interface ConcertInformationProps {
  uuid: string;
}

const ConcertInformation = ({ uuid }: ConcertInformationProps) => {
  const router = useRouter();

  const { data } = useFetchConcertDetail(uuid);
  const {
    title,
    location,
    capability,
    description,
    musicians,
    price,
    startedAt,
    ticketingAt,
    isSeat,
  } = data!;

  return (
    <div className="relative w-full flex-grow h-fit px-7 pb-14 space-y-6">
      <div className="absolute w-full h-10 -top-5 left-0 right-0 bg-white rounded-2xl" />
      <ConcertTitle title={title} location={location} />
      <ThinDivider />
      <ConcertDetail
        capability={capability}
        isSeat={isSeat}
        price={price}
        startedAt={startedAt}
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
