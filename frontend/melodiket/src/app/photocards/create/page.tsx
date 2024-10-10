'use client';

import SubHeader from '@/components/organisms/navigation/SubHeader';
import ReservedTicketListSection from './_components/reserved-ticket-list-section';

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <SubHeader title="티켓 선택" />
      <ReservedTicketListSection />
    </div>
  );
};

export default Page;
