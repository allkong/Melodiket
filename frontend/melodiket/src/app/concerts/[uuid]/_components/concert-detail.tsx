import LabelValueText from '@/components/molecules/text/LabelValutText';
import { formatPrice } from '@/utils/concertFormatter';

interface ConcertDetailProps {
  startAt: string;
  ticketingAt: string;
  seatCapacity: number;
  ticketPrice: number;
  isStanding: boolean;
}

const ConcertDetail = ({
  startAt,
  ticketingAt,
  seatCapacity,
  ticketPrice,
  isStanding,
}: ConcertDetailProps) => {
  return (
    <div className="space-y-2">
      <LabelValueText label="공연일" value={startAt} />
      <LabelValueText label="티켓팅 시작" value={ticketingAt} />
      <LabelValueText label="수용인원" value={`${seatCapacity}명`} />
      <LabelValueText label="가격" value={formatPrice(ticketPrice ?? 0)} />
      <LabelValueText label="형태" value={isStanding ? '스탠딩' : '좌석'} />
    </div>
  );
};

export default ConcertDetail;
