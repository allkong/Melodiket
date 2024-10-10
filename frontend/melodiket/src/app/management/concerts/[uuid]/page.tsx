'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGetConcertInfo } from '@/services/concert/fetchConcert';
import { useCancelConcert } from '@/services/approval/fetchApproval';
import { useConcertClose } from '@/services/wallet/fetchWallet';
import Header from '@/components/organisms/navigation/Header';
import PosterFrame from '@/components/atoms/image-frame/PosterFrame';
import DetailSection from '@/components/molecules/section/DetailSection';
import MusicianStatusProfile from '@/components/molecules/profile/MusicianStatusProfile';
import TicketInfo from '@/components/atoms/text/TicketInfo';
import SmallButton from '@/components/atoms/button/SmallButton';
import { formatDateToYMDHM } from '@/utils/dayjsPlugin';
import { formatPrice } from '@/utils/concertFormatter';
import { getCidUrl, getS3Url } from '@/utils/getUrl';
import toast from 'react-hot-toast';
import FixedButton from '@/components/organisms/controls/FixedButton';
import { Ticket } from '@/public/icons';

const ConcertDetailPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const concertUuid = pathname.split('/').pop();

  const { mutate: getConcertInfo, data: concert } = useGetConcertInfo();
  const { mutate: cancelConcert } = useCancelConcert();
  const { mutate: concertClose } = useConcertClose(); // Use the concert close mutation

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

  const showCancelButton =
    !concert?.musicians?.some(
      (musician) => musician.approvalStatus === 'DENIED'
    ) && concert?.status !== 'CANCELED';

  const handleScanButtonClick = () => {
    window.location.href = `${pathname}/scan`;
  };

  const handleCancelConcert = () => {
    if (concertUuid) {
      cancelConcert(concertUuid, {
        onSuccess: () => {
          toast('공연이 성공적으로 취소되었습니다.');
          router.push('/management/concerts');
        },
        onError: () => {
          toast.error('공연 취소에 실패했습니다.');
        },
      });
    }
  };

  const handleConcertClose = () => {
    if (concertUuid) {
      concertClose(concertUuid, {
        onSuccess: () => {
          toast('공연 정산이 성공적으로 완료되었습니다.');
          getConcertInfo(concertUuid); // Refresh concert info after closing
        },
        onError: () => {
          toast.error('공연 정산 실패!');
        },
      });
    }
  };

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
            <div className="flex space-x-2">
              {showCancelButton && (
                <SmallButton label="공연 취소" onClick={handleCancelConcert} />
              )}
              {concert?.status === 'ACTIVE' && (
                <SmallButton label="공연 정산" onClick={handleConcertClose} />
              )}
            </div>
          </div>
        </div>
        <DetailSection title="참여 뮤지션">
          <div className="flex flex-wrap gap-4">
            {concert?.musicians?.map((musician) => (
              <MusicianStatusProfile
                key={musician.musicianUuid}
                src={getS3Url(musician.imageUrl || '')}
                musicianName={musician.name || '정보 없음'}
                status={musician.approvalStatus}
              />
            ))}
          </div>
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
      <FixedButton
        label="모바일 티켓 스캔"
        icon={<Ticket />}
        onClick={handleScanButtonClick}
      />
    </div>
  );
};

export default ConcertDetailPage;
