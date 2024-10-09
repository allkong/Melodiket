'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ConfirmModalProps {
  children?: ReactNode;
}

const SelectModal = ({ children }: ConfirmModalProps) => {
  const router = useRouter();

  const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.back();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center max-w-xl mx-auto">
      <div className="z-20 bg-white w-full">{children && <>{children}</>}</div>
      <div
        onMouseUp={handleClickClose}
        className="absolute inset-0 bg-black opacity-20"
      ></div>
    </div>
  );
};

export default SelectModal;
