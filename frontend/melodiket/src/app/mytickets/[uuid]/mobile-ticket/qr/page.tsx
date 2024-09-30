'use client';

import { useRouter } from 'next/navigation';

import useTicketStore from '@/store/ticketStore';
import { formatDateWithDayAndTime } from '@/utils/dayjsPlugin';

import { LogoImage, LogoText } from '@/public/icons';
import GenerateQR from '@/components/atoms/qrcode/GenerateQR';
import CloseButton from '@/components/atoms/button/CloseButton';

const Page = () => {
  const router = useRouter();
  const { ticketDetail } = useTicketStore();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <div className="flex flex-col items-center mt-[6vh]">
        <h1 className="text-xl font-medium">{ticketDetail?.concertTitle}</h1>
        <p className="mt-2 text-lg text-gray-500">
          {formatDateWithDayAndTime(ticketDetail?.startAt || '')}
        </p>
      </div>

      <GenerateQR value={ticketDetail?.ticketUuid || 'no data'} />

      <div className="flex flex-col items-center">
        <LogoImage className="mb-3 w-11 h-11" />
        <LogoText />
      </div>
      <div className="">
        <CloseButton onClick={handleClose} hasBorder />
      </div>
    </div>
  );
};

export default Page;
