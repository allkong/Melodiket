'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/organisms/navigation/Header';
import TextBanner from '@/components/molecules/text/TextBanner';
import ConcertApproval from '@/components/organisms/approval/ConcertApproval';
import { useGetMyAssignedConcerts } from '@/services/concert/fetchConcert';
import {
  useApprovalConcert,
  useDenyConcert,
} from '@/services/approval/fetchApproval';

const Page = () => {
  const router = useRouter();
  const { mutate: fetchMyConcerts, data } = useGetMyAssignedConcerts();
  const { mutate: approveConcert } = useApprovalConcert();
  const { mutate: denyConcert } = useDenyConcert();

  useEffect(() => {
    fetchMyConcerts();
  }, []);

  console.log(data);

  const handleApprove = (signatureUrl: string, concertUuid: string) => {
    approveConcert({
      id: concertUuid,
      approvalRequest: { signatureImageUrl: signatureUrl },
    });
  };

  const handleReject = (concertUuid: string) => {
    denyConcert(concertUuid);
    console.log(`거절된 콘서트 UUID: ${concertUuid}`);
  };

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
              price={`${concert.ticketPrice.toLocaleString('ko-KR')} MLDY`}
              onApprove={(signatureUrl) =>
                handleApprove(signatureUrl, concert.uuid)
              }
              onReject={() => handleReject(concert.uuid)}
              isChecked={concert.approvalStatus === 'PENDING' ? false : true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;