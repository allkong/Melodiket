'use client';

import { useRouter } from 'next/navigation';

import Header from '@/components/organisms/navigation/Header';
import TextBanner from '@/components/molecules/text/TextBanner';
import ConcertApproval from '@/components/organisms/approval/ConcertApproval';

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0 p-4 overflow-y-auto">
        <TextBanner
          title="공연이 승인 대기중이에요"
          description="참여자 모두의 승인을 받아야 공연이 진행됩니다"
        />
        <div className="mt-10 mb-4 mx-2">
          <ConcertApproval
            concertName="아이유 공연"
            date="2024.12.21(금)"
            price="13,000원"
          />
        </div>
        <div className="mb-4 mx-2">
          <ConcertApproval
            concertName="아이유 공연"
            date="2024.12.21(금)"
            price="13,000원"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
