import { Concert } from '@/types/concert';
import LabelValueText from '@/components/molecules/text/LabelValutText';
import { formatPrice } from '@/utils/concertFormatter';

interface ConcertDetailProps
  extends Pick<
    Concert,
    'startAt' | 'ticketingAt' | 'isAvailableSeat' | 'ticketPrice' | 'isStanding'
  > {}

const ConcertDetail = ({
  ticketingAt,
  startAt,
  isAvailableSeat,
  ticketPrice,
  isStanding,
}: ConcertDetailProps) => {
  return (
    <div className="space-y-2">
      <LabelValueText label="공연일" value={startAt} />
      <LabelValueText label="티켓팅 시작" value={ticketingAt} />
      <LabelValueText
        label="수용인원"
        value={`${isAvailableSeat.length * isAvailableSeat[0].length}명`}
      />
      <LabelValueText label="가격" value={formatPrice(ticketPrice ?? 0)} />
      <LabelValueText label="형태" value={isStanding ? '스탠딩' : '좌석'} />
    </div>
  );
};

export default ConcertDetail;
