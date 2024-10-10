'use client';

import { useSearchParams } from 'next/navigation';

import StickerSelectModal from './_components/StickerSelectModal';

const Modal = () => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');

  if (select === 'sticker') {
    return <StickerSelectModal />;
  }

  return null;
};

export default Modal;
