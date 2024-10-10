'use client';

import { useSearchParams } from 'next/navigation';

import StickerSelectModal from './_components/StickerSelectModal';
import TextSelectModal from './_components/TextSelectModal';

const Modal = () => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');

  if (select === 'sticker') {
    return <StickerSelectModal />;
  }

  if (select === 'text') {
    return <TextSelectModal />;
  }

  return null;
};

export default Modal;
