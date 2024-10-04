'use client';

import { useSearchParams } from 'next/navigation';

import ConfirmModal from '@/components/organisms/modal/ConfirmModal';

const Modal = () => {
  const searchParams = useSearchParams();
  const isModalVisible = searchParams.get('modal') === 'true';

  return (
    <div>
      {isModalVisible && (
        <ConfirmModal title="제목" onOk={() => alert('확인')}>
          <p>내용</p>
        </ConfirmModal>
      )}
    </div>
  );
};

export default Modal;
