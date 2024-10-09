'use client';

import { useRouter } from 'next/navigation';

import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import dayjs, { formatDateWithDayAndTime } from '@/utils/dayjsPlugin';

import ThinDivider from '@/components/atoms/divider/ThinDivider';
import ConcertTitle from './concert-title';
import ConcertDetail from './concert-detail';
import MusiciansInformation from './musician-information';
import ConcertDescription from './concert-description';
import LargeButton from '@/components/atoms/button/LargeButton';

interface ConcertInformationProps {
  uuid: string;
}

const ConcertInformation = ({ uuid }: ConcertInformationProps) => {
  const router = useRouter();
  const { data: concert } = useFetchConcertDetail(uuid);

  return (
    <div className="relative w-full flex-grow h-fit px-7 pb-14 space-y-6">
      <div className="absolute w-full h-10 -top-5 left-0 right-0 bg-white rounded-2xl" />
      <ConcertTitle title={concert?.title} stageName={concert?.stageName} />
      <ThinDivider />
      <ConcertDetail
        startAt={formatDateWithDayAndTime(concert?.startAt || '')}
        ticketingAt={formatDateWithDayAndTime(concert?.ticketingAt || '')}
        seatCapacity={concert?.capacity ?? 0}
        ticketPrice={concert?.ticketPrice ?? 0}
        isStanding={concert?.isStanding ?? false}
      />
      <ThinDivider />
      <MusiciansInformation musicians={concert?.musicians} />
      <ThinDivider />
      <ConcertDescription description={concert?.description} />
      <div className="fixed w-full max-w-xl bottom-0 left-1/2 -translate-x-1/2 px-6 py-3 bg-white">
        <LargeButton
          label="예매하기"
          onClick={() => router.push(`/concerts/${uuid}/book`)}
          disabled={dayjs().isBefore(dayjs(concert?.ticketingAt))}
        />
      </div>
    </div>
  );
};

export default ConcertInformation;
