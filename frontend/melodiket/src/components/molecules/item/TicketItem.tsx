import { formatDateToYMD } from '@/utils/dayjsPlugin';

import PosterImage from '@/components/atoms/image-frame/PosterImage';
import TicketInfo from '@/components/atoms/text/TicketInfo';

interface TicketItemProps {
  src: string;
  concertTitle: string;
  stageName: string;
  createdAt?: string;
  refundAt?: string;
  startAt?: string;
}

const TicketItem = ({
  src,
  concertTitle,
  stageName,
  createdAt,
  refundAt,
  startAt,
}: TicketItemProps) => {
  const ticketInfo = [
    { label: '장소', value: stageName },
    createdAt ? { label: '예매일', value: formatDateToYMD(createdAt) } : null,
    refundAt ? { label: '취소일', value: formatDateToYMD(refundAt) } : null,
    startAt ? { label: '공연일', value: formatDateToYMD(startAt) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="flex items-center px-5 py-4 bg-white border-b border-purple-50">
      <PosterImage src={src} size="sm" />
      <div className="flex flex-col ms-4 justify-between h-full py-1.5">
        <h2 className="text-lg font-semibold line-clamp-1">{concertTitle}</h2>
        <div className="flex mt-1 text-gray-500">
          <TicketInfo fields={ticketInfo} size="sm" />
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
