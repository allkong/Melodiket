import Image from 'next/image';

interface TicketItemProps {
  src: string;
  concertTitle: string;
  stageName: string;
  createdAt: string;
  startAt: string;
}

const TicketItem = ({
  src,
  concertTitle,
  stageName,
  createdAt,
  startAt,
}: TicketItemProps) => {
  return (
    <div className="flex items-center px-5 py-4 bg-white border-b border-purple-50">
      <div className="relative flex-shrink-0 w-[4.5rem] h-[6.2rem] overflow-hidden rounded-[0.2rem]">
        <Image src={src} alt="poster" className="object-cover" fill />
      </div>
      <div className="flex flex-col ms-4">
        <h2 className="text-lg font-semibold line-clamp-1">{concertTitle}</h2>
        <div className="flex mt-1.5 space-x-4 text-xs text-gray-500">
          <div className="flex flex-col text-gray-400">
            <p>장소</p>
            <p>예매일</p>
            <p>공연일</p>
          </div>
          <div className="flex flex-col">
            <p>{stageName}</p>
            <p>{createdAt}</p>
            <p>{startAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
