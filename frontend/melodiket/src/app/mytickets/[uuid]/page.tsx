'use client';

import { useTicketDetail } from '@/services/ticket/useTicketdetail';

import PosterImage from '@/components/atoms/image-frame/PosterImage';
import Header from '@/components/organisms/navigation/Header';
import SmallButton from '@/components/atoms/button/SmallButton';

const Page = () => {
  const { data: ticket } = useTicketDetail();
  console.log(ticket);

  return (
    <div>
      <Header />
      <div className="px-6">
        <div className="flex mt-4 space-x-4">
          <PosterImage src={ticket?.posterCid || ''} size="md" />
          <div className="flex flex-col justify-between">
            <h1 className="font-medium">{ticket?.concertTitle}</h1>
            <SmallButton label="예매 페이지 보기" onClick={() => {}} />
          </div>
        </div>
        <div>
          <h2>최애 밴드</h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
