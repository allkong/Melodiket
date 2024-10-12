'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import dayjs, { formatDateWithDayAndTime } from '@/utils/dayjsPlugin';
import { useFetchConcertDetail } from '@/services/concert/fetchConcert';
import useAuthStore from '@/store/authStore';

import ThinDivider from '@/components/atoms/divider/ThinDivider';
import ConcertTitle from './concert-title';
import ConcertDetail from './concert-detail';
import MusiciansInformation from './musician-information';
import ConcertDescription from './concert-description';
import FixedButton from '@/components/organisms/controls/FixedButton';

const getButtonMessage = (disabled: boolean, remainSeat: number) => {
  if (disabled) {
    return '아직 예매 시간이 아니에요';
  }

  if (remainSeat <= 0) {
    return '남은 좌석이 없어요';
  }

  return '예매하기';
};

interface ConcertInformationProps {
  uuid: string;
}

const ConcertInformation = ({ uuid }: ConcertInformationProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: concert } = useFetchConcertDetail(uuid);

  const handleClick = () => {
    if (!user) {
      toast('로그인 후 이용해 주세요', { icon: '😥' });
      return;
    }

    if (concert?.isStanding) {
      router.push(`/concerts/${uuid}/book?step=confirm`);
      return;
    } else {
      router.push(`/concerts/${uuid}/book?step=seat`);
      return;
    }
  };

  const disabled = dayjs().isBefore(dayjs(concert?.ticketingAt));
  const isBeforeConcert = dayjs().isBefore(dayjs(concert?.startAt));

  return (
    <>
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
          remainSeat={concert?.availableTickets ?? 0}
        />
        <ThinDivider />
        <MusiciansInformation musicians={concert?.musicians} />
        <ThinDivider />
        <ConcertDescription description={concert?.description} />
      </div>
      {isBeforeConcert && (
        <FixedButton
          label={getButtonMessage(disabled, concert?.availableTickets ?? 0)}
          onClick={handleClick}
          disabled={disabled || (concert?.availableTickets ?? 0) <= 0}
        />
      )}
    </>
  );
};

export default ConcertInformation;
