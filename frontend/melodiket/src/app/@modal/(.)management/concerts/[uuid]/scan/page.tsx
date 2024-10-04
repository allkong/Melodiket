'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { useTicketDetail } from '@/services/ticket/useTicketdetail';
import { formatSeatPosition } from '@/utils/concertFormatter';

import ConfirmModal from '@/components/organisms/modal/ConfirmModal';
import TicketInfo from '@/components/atoms/text/TicketInfo';
import AlertModal from '@/components/organisms/modal/AlertModal';

const Modal = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const concertUuid = params.uuid;
  const ticketUuid = searchParams.get('ticket');

  const { data: ticket } = useTicketDetail();

  if (concertUuid !== ticket?.concertUuid) {
    return (
      <AlertModal type="error" title="티켓 사용 처리">
        <p>다른 공연의 티켓입니다.</p>
      </AlertModal>
    );
  }

  const ticketInfo = [
    { label: '공연명', value: ticket?.concertTitle || '' },
    { label: '예매자', value: '정다빈' },
    {
      label: '좌석',
      value:
        ticket?.seatRow && ticket?.seatCol
          ? formatSeatPosition(ticket.seatRow, ticket.seatCol)
          : '정보 없음',
    },
  ];

  return (
    <div>
      {ticketUuid && (
        <ConfirmModal
          type="info"
          title="티켓 사용 처리"
          onOk={() => alert('확인')}
        >
          <TicketInfo fields={ticketInfo} size="sm" />
        </ConfirmModal>
      )}
    </div>
  );
};

export default Modal;
