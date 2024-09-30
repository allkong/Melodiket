'use client';

import { useRouter } from 'next/navigation';

import useTicketStore from '@/store/ticketStore';

import { LogoImage, LogoText } from '@/public/icons';
import CloseButton from '@/components/atoms/button/CloseButton';

const Page = () => {
  const router = useRouter();
  const { ticketDetail } = useTicketStore();

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-medium">2024 IU HEREH WORLD TOUR CONCERT</h1>
      <p className="text-lg text-gray-500">2024.09.08(일) 18:00</p>
      <div>qr</div>
      <div className="flex flex-col items-center">
        <LogoImage className="mb-3 w-11 h-11" />
        <LogoText />
      </div>
      <CloseButton onClick={handleClose} hasBorder />
    </div>
  );
};

export default Page;
