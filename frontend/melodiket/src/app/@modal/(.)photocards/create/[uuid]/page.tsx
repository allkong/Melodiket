'use client';

import SelectModal from '@/components/organisms/modal/SelectModal';
import { useSearchParams } from 'next/navigation';

const Modal = () => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');

  if (select === 'text') {
    return (
      <SelectModal>
        <p>텍스트</p>
      </SelectModal>
    );
  }

  if (select === 'sticker') {
    return (
      <SelectModal>
        <p>스티커</p>
      </SelectModal>
    );
  }
};

export default Modal;
