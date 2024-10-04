'use client';

import { useSearchParams } from 'next/navigation';

import ConfirmModal from '@/components/organisms/modal/ConfirmModal';

const Modal = () => {
  const searchParams = useSearchParams();
  const ticketUuid = searchParams.get('ticket');

  return (
    <div>
      {ticketUuid && (
        <ConfirmModal title="제목" onOk={() => alert('확인')}>
          <p>내용</p>
        </ConfirmModal>
      )}
    </div>
  );
};

export default Modal;
