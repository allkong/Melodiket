'use client';

import SubHeader from '@/components/organisms/navigation/SubHeader';
import TicketFrame from '@/components/atoms/image-frame/TicketFrame';
import FixedButton from '@/components/organisms/controls/FixedButton';
import { QrCode } from '@/public/icons';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex flex-col h-screen">
      <SubHeader title="모바일 티켓" onClose={handleClose} />

      <div className="flex flex-col items-center flex-grow px-10 pb-24 mb-2 justify-evenly overscroll-y-auto">
        <h1 className="font-medium text-center text-gray-500 line-clamp-1">
          2024 IU HEREH WORLD TOUR CONCERT
        </h1>

        <div className="flex-grow flex items-center justify-center max-h-[70vh]">
          <TicketFrame src="https://i.namu.wiki/i/QwiztPBYzKX8d8-VsOKnVErKfVRk2wijjyXRT5P2r8PWC_K5Rd6zoq-GNL2C3jYROGcakDMfi_rmwOPB4ZwnB09VtdrHW_gnLZ0G1JlUXsFCxtu7Yk4I7UAirtE9gwAMEAGnCpAD04emSIrK9voE7g.webp" />
        </div>
      </div>

      <FixedButton label="QR코드 확인" icon={<QrCode />} />
    </div>
  );
};

export default Page;
