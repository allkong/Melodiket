'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { CONCERT_TYPES } from '@/constants/concertTypes';
import { useTicketList } from '@/services/ticket/useTicketList';
import { TICKET_STATUS } from '@/constants/tickets';

import Header from '@/components/organisms/navigation/Header';
import Tabs from '@/components/organisms/controls/Tabs';
import LargeButton from '@/components/atoms/button/LargeButton';
import TicketItem from '@/components/molecules/item/ConcertItem';
import EmptyData from '@/components/molecules/text/EmptyData';

const Page = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(CONCERT_TYPES)[0]);
  const router = useRouter();

  const { data: tickets } = useTicketList();

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
    setActiveTab(tabValue);
  };

  const handleRegisterClick = () => {
    router.push('/concerts/register');
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Tabs
        tabs={Object.keys(CONCERT_TYPES)}
        activeTab={activeTab}
        onClick={handleTabClick}
        labelMap={CONCERT_TYPES}
      />
      <div className="flex-grow h-0 overflow-y-auto">
        {filteredTickets.length ? (
          filteredTickets.map((ticket) => (
            <Link
              href={`/management/concerts/${ticket.ticketUuid}`}
              key={ticket.ticketUuid}
            >
              <TicketItem
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
                ? '등록된 공연이 없어요'
                : '취소된 공연이 없어요'
            }
          />
        )}
      </div>

      <div className="my-4 h-fit px-4">
        <LargeButton label="공연 등록" onClick={handleRegisterClick} />
      </div>
    </div>
  );
};

export default Page;
