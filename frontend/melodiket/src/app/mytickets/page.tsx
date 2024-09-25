'use client';

import { useState } from 'react';

import { useReservedTickets } from '@/services/ticket/useReservedTickets';
import { HISTORY_TYPES } from '@/constants/tickets';

import Header from '@/components/organisms/navigation/Header';
import Tabs from '@/components/organisms/controls/Tabs';
import TicketItem from '@/components/molecules/item/TicketItem';
import EmptyData from '@/components/molecules/text/EmptyData';

const Page = () => {
  const { data: tickets } = useReservedTickets();
  const [activeTab, setActiveTab] = useState(Object.keys(HISTORY_TYPES)[0]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
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
      {tickets?.length ? (
        tickets.map((ticket) => (
          <TicketItem
            key={ticket.ticketId}
            src={ticket.poster}
            concertTitle={ticket.concertTitle}
            stageName={ticket.stageName}
            createdAt={ticket.createdAt || ''}
            startAt={ticket.startAt}
          />
        ))
      ) : (
        <EmptyData text="예매한 공연이 없어요" />
      )}
    </div>
  );
};

export default Page;
