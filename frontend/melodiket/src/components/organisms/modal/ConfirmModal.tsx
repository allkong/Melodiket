'use client';

import { MouseEventHandler, ReactNode, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { WarningCircle } from '@/public/icons';
import MediumButton from '@/components/atoms/button/MediumButton';

interface ConfirmModalProps {
  type?: 'info' | 'warning' | 'error';
  title: string;
  children?: ReactNode;
  onOk: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmModal = ({ type, title, children, onOk }: ConfirmModalProps) => {
  const router = useRouter();
  const clickedRef = useRef<EventTarget>();

  const onCancel = useCallback(() => {
    router.back();
  }, [router]);

  const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
    if (clickedRef.current) {
      clickedRef.current = undefined;
      return;
    }

    e.stopPropagation();
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="z-20 px-5 py-5 space-y-5 bg-white rounded-xl w-fit">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {type && (
              <WarningCircle
                className={clsx({
                  'text-[#3347FF]': type === 'info',
                  'text-[#FFD233]': type === 'warning',
                  'text-[#FF3333]': type === 'error',
                })}
              />
            )}
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>

          {children && <>{children}</>}
        </div>

        <div className="space-x-3">
          <MediumButton label="취소" color="gray" onClick={onCancel} />
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
