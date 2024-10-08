'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/organisms/navigation/Header';
import TextBanner from '@/components/molecules/text/TextBanner';
import ConcertApproval from '@/components/organisms/approval/ConcertApproval';
import { useGetMyAssignedConcerts } from '@/services/concert/fetchConcert';

const Page = () => {
  const router = useRouter();
  const { mutate: fetchMyConcerts, data } = useGetMyAssignedConcerts();

  useEffect(() => {
    fetchMyConcerts();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow h-0 p-4 overflow-y-auto">
        <TextBanner
          title="공연이 승인 대기중이에요"
          description="참여자 모두의 승인을 받아야 공연이 진행됩니다"
        />
        <div className="mt-10"></div>
        {data?.result.map((concert) => (
          <div key={concert.uuid} className="mb-4 mx-2">
            <ConcertApproval
              concertName={concert.title}
              date={new Date(concert.ticketingAt).toLocaleDateString('ko-KR')}
              price={`${concert.ticketPrice.toLocaleString('ko-KR')}원`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
