'use client';

import SubHeader from '@/components/organisms/navigation/SubHeader';
import TicketFrame from '@/components/atoms/image-frame/TicketFrame';
import FixedButton from '@/components/organisms/controls/FixedButton';
import { QrCode } from '@/public/icons';
import { usePathname, useRouter } from 'next/navigation';
import useTicketStore from '@/store/ticketStore';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { ticketDetail } = useTicketStore();

  const handleClose = () => {
    router.back();
  };

  const handleQRButtonClick = () => {
    router.push(`${pathname}/qr`);
  };

  return (
    <div className="flex flex-col h-screen">
      <SubHeader title="모바일 티켓" onClose={handleClose} />

      <div className="flex flex-col items-center flex-grow px-10 pb-24 mb-2 justify-evenly overscroll-y-auto">
        <h1 className="font-medium text-center text-gray-500 line-clamp-1">
          {ticketDetail?.concertTitle}
        </h1>

        <div className="flex-grow flex items-center justify-center max-h-[70vh]">
          <TicketFrame src={ticketDetail?.posterCid || ''} />
        </div>
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
