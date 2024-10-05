'use client';

import { useRouter } from 'next/navigation';

import useTicketStore from '@/store/ticketStore';
import { formatDateWithDayAndTime } from '@/utils/dayjsPlugin';

import { LogoImage, LogoText } from '@/public/icons';
import GenerateQR from '@/components/atoms/qrcode/GenerateQR';
import CloseButton from '@/components/atoms/button/CloseButton';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/atoms/feedback/LoadingSpinner';

const Page = () => {
  const router = useRouter();
  const { ticketDetail } = useTicketStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen py-[8vh]">
      <div className="flex flex-col items-center justify-center flex-grow py-4 min-h-[60vh]">
        {isHydrated ? (
          <>
            <div className="flex flex-col items-center mb-[8vh]">
              <h1 className="text-xl font-medium">
                {ticketDetail?.concertTitle}
              </h1>
              <p className="mt-2 text-lg text-gray-500">
                {formatDateWithDayAndTime(ticketDetail?.startAt || '')}
              </p>
            </div>
            <GenerateQR value={ticketDetail?.ticketUuid || 'no data'} />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>

      <div className="flex flex-col items-center justify-between flex-grow">
        <div className="flex flex-col items-center">
          <LogoImage className="mb-3 w-11 h-11" />
          <LogoText />
        </div>

        <CloseButton onClick={handleClose} hasBorder />
      </div>
    </div>
  );
};

export default Page;
