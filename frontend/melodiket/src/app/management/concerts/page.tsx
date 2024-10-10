'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { CONCERT_TYPES } from '@/constants/concertTypes';
import { useGetMyConcerts } from '@/services/concert/fetchConcert';
import Header from '@/components/organisms/navigation/Header';
import Tabs from '@/components/organisms/controls/Tabs';
import LargeButton from '@/components/atoms/button/LargeButton';
import TicketItem from '@/components/molecules/item/TicketItem';
import EmptyData from '@/components/molecules/text/EmptyData';
import { getCidUrl } from '@/utils/getUrl';

const Page = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(CONCERT_TYPES)[0]);
  const router = useRouter();

  const { mutate: getMyConcerts, data: concertData } = useGetMyConcerts();

  useEffect(() => {
    getMyConcerts();
  }, []);

  const concerts = Array.isArray(concertData)
    ? concertData
    : concertData?.result || [];

  const filteredConcerts = useMemo(() => {
    return (
      concerts.filter((concert) => {
        if (activeTab === 'isRegistered') {
          console.log(concert.status);
          return (
            concert.status === 'PREPARING' ||
            concert.status === 'ACTIVE' ||
            concert.status === 'TRANSFERED'
          );
        }
        return concert.status === 'CANCELED';
      }) || []
    );
  }, [concerts, activeTab]);

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const handleRegisterClick = () => {
    router.push('/management/concerts/register');
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
        {filteredConcerts.length ? (
          filteredConcerts.map((concert) => (
            <Link
              href={`/management/concerts/${concert.concertUuid}`}
              key={concert.concertUuid}
            >
              <TicketItem
                src={getCidUrl(concert.posterCid)}
                concertTitle={concert.title}
                stageName={concert.stageName}
                createdAt={concert.createdAt}
                startAt={concert.startAt}
              />
            </Link>
          ))
        ) : (
          <EmptyData
            text={
              activeTab === 'isRegistered'
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
