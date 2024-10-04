'use client';

import { ReactNode, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { WarningCircle } from '@/public/icons';
import CloseButton from '@/components/atoms/button/CloseButton';

interface AlertModalProps {
  type?: 'info' | 'warning' | 'error';
  title?: string;
  children?: ReactNode;
}

const AlertModal = ({ type, title, children }: AlertModalProps) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center max-w-xl mx-auto">
      <div className="z-20 px-5 py-5 space-y-5 bg-white rounded-xl w-fit max-w-[90%]">
        <div className="space-y-4">
          <div className="flex space-x-8">
            <div className="flex items-center space-x-3">
              {type && (
                <WarningCircle
                  className={clsx('flex-shrink-0', {
                    'text-[#3347FF]': type === 'info',
                    'text-[#FFD233]': type === 'warning',
                    'text-[#FF3333]': type === 'error',
                  })}
                />
              )}
              {title && (
                <h1 className="text-lg font-semibold line-clamp-1">{title}</h1>
              )}
            </div>
            <CloseButton onClick={onCancel} />
          </div>

          {children && <>{children}</>}
        </div>
      </div>
      <div
        onMouseUp={handleClickClose}
        className="absolute inset-0 bg-black opacity-20"
      ></div>
    </div>
  );
};

export default AlertModal;
