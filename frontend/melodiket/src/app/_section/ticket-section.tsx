'use client';

import TicketInfoCarousel from '@/components/molecules/carousel/TicketInfoCarousel';
import { useTicketList } from '@/services/ticket/fetchTicket';
import useAuthStore from '@/store/authStore';
import { Ticket } from '@/types/ticket';
import { User } from '@/types/user';
import { formatDateToYMD } from '@/utils/dayjsPlugin';

const getCarouselData = (user: User | null, data: Ticket[] | undefined) => {
  if (!user) {
    return Array.from({ length: 3 }).map(() => '로그인이 필요한 서비스입니다.');
  }

  if (!data || data.length === 0) {
    return Array.from({ length: 3 }).map(() => '예정된 공연이 없습니다.');
  }

  return data?.map(
    (ticket) =>
      `${ticket.concertTitle} - ${formatDateToYMD(ticket.startAt ?? '')}`
  );
};

const TicketSection = () => {
  const { user } = useAuthStore();
  const { data } = useTicketList();

  const carouselData = getCarouselData(user, data);

  return <TicketInfoCarousel data={carouselData} />;
};

export default TicketSection;
