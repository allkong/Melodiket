'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { useTicketList } from '@/services/ticket/fetchTicket';
import { TICKET_STATUS } from '@/constants/tickets';
import { getCidUrl } from '@/utils/getUrl';

import TicketItem from '@/components/molecules/item/TicketItem';
import EmptyData from '@/components/molecules/text/EmptyData';
import usePosterStore from '@/store/posterStore';

const ReservedTicketListSection = () => {
  const router = useRouter();

  const { data: tickets } = useTicketList();
  const { setPosterCid } = usePosterStore();

  const filteredTickets = useMemo(() => {
    return (
      tickets?.filter((ticket) => {
        return (
          ticket.status === TICKET_STATUS.reserved ||
          ticket.status === TICKET_STATUS.used
        );
      }) || []
    );
  }, [tickets]);

  const handleTicketClick = (ticketUuid: string, posterCid: string) => {
    setPosterCid(posterCid);
    router.push(`/photocards/create/${ticketUuid}`);
  };

  return (
    <>
      {filteredTickets.length ? (
        filteredTickets.map((ticket) => (
          <div
            key={ticket.ticketUuid}
            onClick={() =>
              handleTicketClick(ticket.ticketUuid, ticket.posterCid)
            }
            className="cursor-pointer"
          >
            <TicketItem
              src={getCidUrl(ticket.posterCid)}
              concertTitle={ticket.concertTitle}
              stageName={ticket.stageName}
              createdAt={ticket.createdAt}
              {...(ticket.refundAt
                ? { refundAt: ticket.refundAt }
                : { startAt: ticket.startAt })}
            />
          </div>
        ))
      ) : (
        <EmptyData text={'예매한 공연이 없어요'} />
      )}
    </>
  );
};

export default ReservedTicketListSection;
