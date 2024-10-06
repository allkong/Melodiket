import { useMemo } from 'react';
import Link from 'next/link';

import { useTicketList } from '@/services/ticket/useTicketList';
import { TICKET_STATUS } from '@/constants/tickets';

import ConcertItem from '@/components/molecules/item/ConcertItem';
import EmptyData from '@/components/molecules/text/EmptyData';

const ReservedTicketListSection = () => {
  const { data: tickets } = useTicketList();

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

  return (
    <>
      {filteredTickets.length ? (
        filteredTickets.map((ticket) => (
          <Link
            href={`/photocards/create/${ticket.ticketUuid}`}
            key={ticket.ticketUuid}
          >
            <ConcertItem
              src={ticket.posterCid}
              concertTitle={ticket.concertTitle}
              stageName={ticket.stageName}
              createdAt={ticket.createdAt}
              {...(ticket.refundAt
                ? { refundAt: ticket.refundAt }
                : { startAt: ticket.startAt })}
            />
          </Link>
        ))
      ) : (
        <EmptyData text={'예매한 공연이 없어요'} />
      )}
    </>
  );
};

export default ReservedTicketListSection;
