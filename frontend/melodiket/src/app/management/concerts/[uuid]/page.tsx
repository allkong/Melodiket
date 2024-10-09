'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useTicketDetail } from '@/services/ticket/fetchTicket';
import { formatDateToYMDHM } from '@/utils/dayjsPlugin';
import { formatPrice, formatSeatPosition } from '@/utils/concertFormatter';
import { TICKET_STATUS_LABELS } from '@/constants/tickets';

import Header from '@/components/organisms/navigation/Header';
import PosterFrame from '@/components/atoms/image-frame/PosterFrame';
import SmallButton from '@/components/atoms/button/SmallButton';
import MusicianStatusProfile from '@/components/molecules/profile/MusicianStatusProfile';
import TicketInfo from '@/components/atoms/text/TicketInfo';
import FixedButton from '@/components/organisms/controls/FixedButton';
import DetailSection from '@/components/molecules/section/DetailSection';
import { Ticket } from '@/public/icons';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: ticket } = useTicketDetail();

  const ticketInfo = [
    { label: '예매자', value: '정다빈' },
    { label: '장소', value: ticket?.stageName || '정보 없음' },
    {
      label: '좌석',
      value:
        ticket?.seatRow && ticket?.seatCol
          ? formatSeatPosition(ticket.seatRow, ticket.seatCol)
          : '정보 없음',
    },
    ticket?.createdAt && {
      label: '예매일',
      value: formatDateToYMDHM(ticket?.createdAt),
    },
    ticket?.startAt && {
      label: '관람일',
      value: formatDateToYMDHM(ticket?.startAt),
    },
    ticket?.usedAt && {
      label: '사용일',
      value: formatDateToYMDHM(ticket?.usedAt),
    },
    ticket?.refundAt && {
      label: '취소일',
      value: formatDateToYMDHM(ticket?.refundAt),
    },
    {
      label: '상태',
      value: ticket?.status
        ? TICKET_STATUS_LABELS[ticket?.status]
        : '정보 없음',
    },
  ].filter(Boolean) as { label: string; value: string }[];

  const handleScanButtonClick = () => {
    router.push(`${pathname}/scan`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="px-6 pb-24 overflow-y-auto">
        {/* 포스터 및 제목 */}
        <div className="flex py-4 space-x-4 border-b">
          <PosterFrame src={ticket?.posterCid || ''} size="md" />
          <div className="flex flex-col justify-between">
            <h1 className="font-medium">
              {ticket?.concertTitle || '콘서트 정보 없음'}
            </h1>
            <SmallButton label="공연 취소" onClick={() => alert('공연 취소')} />
          </div>
        </div>

        {/* 참여 밴드 */}
        <DetailSection title="참여 밴드">
          <MusicianStatusProfile
            src={ticket?.myFavoriteMusician.musicianImageUrl || ''}
            musicianName={
              ticket?.myFavoriteMusician.musicianName || '정보 없음'
            }
            status="pending"
          />
        </DetailSection>

        {/* 공연 정보 */}
        <DetailSection title="공연 정보">
          <TicketInfo fields={ticketInfo} />
        </DetailSection>

        {/* 가격 정보 */}
        <DetailSection title="가격 정보" isLast>
          <div className="flex items-center justify-between">
            <p className="font-medium text-purple-400">
              {ticket?.ticketPrice
                ? formatPrice(ticket?.ticketPrice)
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

export default Page;
