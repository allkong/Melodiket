'use client';

import { ReactNode, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import CloseButton from '@/components/atoms/button/CloseButton';
import Warning from '@/components/atoms/feedback/Warning';

interface AlertModalProps {
  type?: 'info' | 'warning' | 'error';
  title?: string;
  children?: ReactNode;
  duration?: number;
}

const AlertModal = ({ type, title, children, duration }: AlertModalProps) => {
  const router = useRouter();
  const clickedRef = useRef<EventTarget>();

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
    if (clickedRef.current) {
      clickedRef.current = undefined;
      return;
    }

    e.stopPropagation();
    handleCancel();
  };

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleCancel();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [handleCancel, duration]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center max-w-xl mx-auto pt-20">
      <div className="z-20 px-5 py-5 space-y-5 bg-white rounded-xl w-fit max-w-[90%]">
        <div className="space-y-4">
          <div className="flex space-x-8">
            <div className="flex items-center space-x-3">
              {type && <Warning type={type} />}
              {title && (
                <h1 className="text-lg font-semibold line-clamp-1">{title}</h1>
              )}
            </div>
            <CloseButton onClick={handleCancel} />
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
