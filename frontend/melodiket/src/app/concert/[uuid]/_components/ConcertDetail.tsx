import { Concert } from '@/types/concert';
import LabelValueText from '@/components/molecules/text/LabelValutText';
import { formatPrice } from '@/utils/concertFormatter';

interface ConcertDetailProps
  extends Partial<
    Pick<
      Concert,
      'startedAt' | 'ticketingAt' | 'capability' | 'isSeat' | 'price'
    >
  > {}

const ConcertDetail = ({
  capability,
  isSeat,
  price,
  startedAt,
  ticketingAt,
}: ConcertDetailProps) => {
  return (
    <div className="space-y-2">
      <LabelValueText label="공연일" value={startedAt} />
      <LabelValueText label="티켓팅 시작" value={ticketingAt} />
      <LabelValueText label="수용인원" value={`${capability}명`} />
      <LabelValueText label="가격" value={formatPrice(price ?? 0)} />
      <LabelValueText label="형태" value={isSeat ? '좌석' : '스탠딩'} />
    </div>
  );
};

export default ConcertDetail;
