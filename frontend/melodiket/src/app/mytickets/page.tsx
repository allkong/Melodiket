'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { useTicketList } from '@/services/ticket/useTicketList';
import { HISTORY_TYPES, TICKET_STATUS } from '@/constants/tickets';

import Header from '@/components/organisms/navigation/Header';
import Tabs from '@/components/organisms/controls/Tabs';
import ConcertItem from '@/components/molecules/item/ConcertItem';
import EmptyData from '@/components/molecules/text/EmptyData';

const Page = () => {
  const { data: tickets } = useTicketList();
  const [activeTab, setActiveTab] =
    useState<keyof typeof HISTORY_TYPES>('reserved');

  const filteredTickets = useMemo(() => {
    return (
      tickets?.filter((ticket) => {
        if (activeTab === 'reserved') {
          return (
            ticket.status === TICKET_STATUS.reserved ||
            ticket.status === TICKET_STATUS.used
          );
        }
        return ticket.status === TICKET_STATUS.cancelled;
      }) || []
    );
  }, [tickets, activeTab]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue as keyof typeof HISTORY_TYPES);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Tabs
        tabs={Object.keys(HISTORY_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={HISTORY_TYPES}
      />
      {filteredTickets.length ? (
        filteredTickets.map((ticket) => (
          <Link
            href={`/mytickets/${ticket.ticketUuid}`}
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
        <EmptyData
          text={
            activeTab === 'reserved'
              ? '예매한 공연이 없어요'
              : '취소한 공연이 없어요'
          }
        />
      )}
    </div>
  );
};

export default Page;
