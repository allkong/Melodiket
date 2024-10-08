'use client';

import TicketInfoCarousel from '@/components/molecules/carousel/TicketInfoCarousel';
import { useTicketList } from '@/services/ticket/fetchTicket';
import { formatDateToYMD } from '@/utils/dayjsPlugin';

const TicketSection = () => {
  const { data } = useTicketList();

  return (
    <TicketInfoCarousel
      datas={
        data?.map(
          (ticket) =>
            `${ticket.concertTitle} - ${formatDateToYMD(ticket.startAt ?? '')}`
        ) ?? [
          '로그인이 필요한 서비스입니다.',
          '로그인이 필요한 서비스입니다.',
          '로그인이 필요한 서비스입니다.',
        ]
      }
    />
  );
};

export default TicketSection;
