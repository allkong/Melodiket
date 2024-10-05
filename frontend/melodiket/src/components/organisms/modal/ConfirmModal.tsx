'use client';

import { MouseEventHandler, ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';

import MediumButton from '@/components/atoms/button/MediumButton';
import Warning from '@/components/atoms/feedback/Warning';

interface ConfirmModalProps {
  type?: 'info' | 'warning' | 'error';
  title?: string;
  children?: ReactNode;
  onOk: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmModal = ({ type, title, children, onOk }: ConfirmModalProps) => {
  const router = useRouter();
  const clickedRef = useRef<EventTarget>();

  const handleCancel = () => {
    router.back();
  };
  const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
    if (clickedRef.current) {
      clickedRef.current = undefined;
      return;
    }

    e.stopPropagation();
    handleCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center max-w-xl mx-auto">
      <div className="z-20 px-5 py-5 space-y-5 bg-white rounded-xl w-fit max-w-[90%]">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {type && <Warning type={type} />}
            {title && (
              <h1 className="text-lg font-semibold line-clamp-1">{title}</h1>
            )}
          </div>

          {children && <>{children}</>}
        </div>

        <div className="space-x-3 flex justify-center">
          <MediumButton label="취소" color="gray" onClick={handleCancel} />
          <MediumButton label="확인" color="primary" onClick={onOk} />
        </div>
      </div>
      <div
        onMouseUp={handleClickClose}
        className="absolute inset-0 bg-black opacity-20"
      ></div>
    </div>
  );
};

export default ConfirmModal;
