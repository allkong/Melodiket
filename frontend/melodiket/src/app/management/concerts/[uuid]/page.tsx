'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGetConcertInfo } from '@/services/concert/fetchConcert';
import Header from '@/components/organisms/navigation/Header';
import PosterFrame from '@/components/atoms/image-frame/PosterFrame';
import DetailSection from '@/components/molecules/section/DetailSection';
import MusicianStatusProfile from '@/components/molecules/profile/MusicianStatusProfile';
import TicketInfo from '@/components/atoms/text/TicketInfo';
import SmallButton from '@/components/atoms/button/SmallButton';
import FixedButton from '@/components/organisms/controls/FixedButton';
import { formatDateToYMDHM } from '@/utils/dayjsPlugin';
import { formatPrice } from '@/utils/concertFormatter';
import { getCidUrl } from '@/utils/getUrl';

const ConcertDetailPage = () => {
  const pathname = usePathname();
  const concertUuid = pathname.split('/').pop();

  const { mutate: getConcertInfo, data: concert } = useGetConcertInfo();

  useEffect(() => {
    if (concertUuid) {
      getConcertInfo(concertUuid);
    }
  }, [concertUuid]);

  const concertInfo = [
    { label: '공연 제목', value: concert?.title || '정보 없음' },
    { label: '장소', value: concert?.stageName || '정보 없음' },
    {
      label: '공연 시작일',
      value: concert?.startAt
        ? formatDateToYMDHM(concert.startAt)
        : '정보 없음',
    },
    {
      label: '티케팅 시작일',
      value: concert?.ticketingAt
        ? formatDateToYMDHM(concert.ticketingAt)
        : '정보 없음',
    },
    { label: '상태', value: concert?.status || '정보 없음' },
  ].filter(Boolean) as { label: string; value: string }[];

  const showCancelButton = !concert?.musicians?.some(
    (musician) => musician.approvalStatus === 'DENIED'
  );

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="px-6 pb-24 overflow-y-auto">
        <div className="flex py-4 space-x-4 border-b">
          <PosterFrame src={getCidUrl(concert?.posterCid || '')} size="md" />
          <div className="flex flex-col justify-between">
            <h1 className="font-medium">
              {concert?.title || '콘서트 정보 없음'}
            </h1>
            <SmallButton
              label="예매 페이지 미리보기"
              onClick={() => alert('예매 페이지 미리보기')}
            />
          </div>
        </div>

        <DetailSection title="참여 뮤지션">
          {concert?.musicians?.map((musician) => (
            <MusicianStatusProfile
              key={musician.musicianUuid}
              src={musician.imageUrl || ''}
              musicianName={musician.name || '정보 없음'}
              status={musician.approvalStatus}
            />
          ))}
        </DetailSection>

        <DetailSection title="공연 정보">
          <TicketInfo fields={concertInfo} />
        </DetailSection>

        <DetailSection title="가격 정보" isLast>
          <div className="flex items-center justify-between">
            <p className="font-medium text-purple-400">
              {concert?.ticketPrice
                ? formatPrice(concert.ticketPrice)
                : '정보 없음'}
            </p>
          </div>
        </DetailSection>
      </div>

      {showCancelButton && (
        <FixedButton label="공연 취소" onClick={() => alert('공연 취소!')} />
      )}
    </div>
  );
};

export default ConcertDetailPage;
