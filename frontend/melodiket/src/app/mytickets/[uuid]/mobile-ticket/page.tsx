'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import useTicketStore from '@/store/ticketStore';

import SubHeader from '@/components/organisms/navigation/SubHeader';
import TicketFrame from '@/components/atoms/image-frame/TicketFrame';
import FixedButton from '@/components/organisms/controls/FixedButton';
import { QrCode } from '@/public/icons';
import LoadingSpinner from '@/components/atoms/feedback/LoadingSpinner';
import { getCidUrl } from '@/utils/getUrl';

const Page = () => {
  const router = useRouter();
  const { ticketDetail } = useTicketStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleQRButtonClick = () => {
    router.push(`/mytickets/${ticketDetail?.ticketUuid}/mobile-ticket/qr`);
  };

  return (
    <div className="flex flex-col h-screen">
      <SubHeader title="모바일 티켓" />

      <div className="flex flex-col items-center flex-grow px-10 pb-24 mb-2 justify-evenly overscroll-y-auto">
        {isHydrated ? (
          <>
            <h1 className="font-medium text-center text-gray-500 line-clamp-1">
              {ticketDetail?.concertTitle}
            </h1>

            <div className="flex-grow flex items-center justify-center max-h-[70vh]">
              <TicketFrame src={getCidUrl(ticketDetail?.posterCid || '')} />
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>

      <FixedButton
        label="QR코드 확인"
        icon={<QrCode />}
        onClick={handleQRButtonClick}
      />
    </div>
  );
};

export default Page;
