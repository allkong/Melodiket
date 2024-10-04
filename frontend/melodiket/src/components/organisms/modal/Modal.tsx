import { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

import { WarningCircle } from '@/public/icons';
import MediumButton from '@/components/atoms/button/MediumButton';

interface ModalProps {
  type?: 'info' | 'warning' | 'error';
  title: string;
  children?: ReactNode;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onOk: MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ type, title, children, onCancel, onOk }: ModalProps) => {
  return (
    <div className="px-5 py-5 space-y-5 bg-white rounded-xl w-fit">
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
  );
};

export default Modal;
