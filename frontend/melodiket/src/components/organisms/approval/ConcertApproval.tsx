import ApprovalButton from '@/components/atoms/button/ApprovalButton';
import ArrowButton from '@/components/atoms/button/ArrowButton';
import clsx from 'clsx';

interface ConcertApprovalProps {
  concertName: string;
  date: string;
  price: string;
  onApprove?: () => void;
  onReject?: () => void;
}

const ConcertApproval = ({
  concertName,
  date,
  price,
  onApprove,
  onReject,
}: ConcertApprovalProps) => {
  return (
    <div
      className={clsx('w-full p-4 bg-white border rounded-lg flex flex-col')}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-lg">{concertName}</p>
        <ArrowButton direction="right" color="text-gray-400" />
      </div>
      <div className="flex items-center justify-between text-gray-500">
        <div>
          <p>{date}</p>
          <p>{price}</p>
        </div>
        <div className="flex space-x-2">
          <ApprovalButton label="승인" onClick={onApprove} />
          <ApprovalButton label="거절" onClick={onReject} />
        </div>
      </div>
    </div>
  );
};

export default ConcertApproval;
