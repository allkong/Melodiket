'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import { useTicketList } from '@/services/ticket/useTicketList';
import { TICKET_STATUS } from '@/constants/tickets';

import ConcertItem from '@/components/molecules/item/ConcertItem';
import EmptyData from '@/components/molecules/text/EmptyData';
import usePosterStore from '@/store/posterStore';
import { useRouter } from 'next/navigation';

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
          </div>
        ))
      ) : (
        <EmptyData text={'예매한 공연이 없어요'} />
      )}
    </>
  );
};

export default ReservedTicketListSection;
