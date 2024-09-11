'use client';

import clsx from 'clsx';
import { QrCode, Ticket } from '@/public/icons';

interface IconType {
  icon: 'default' | 'qrCode' | 'ticket';
}

interface LargeButtonProps extends Partial<IconType> {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const getIcon = (type?: IconType['icon']) => {
  switch (type) {
    case 'qrCode': {
      return QrCode;
    }
    case 'ticket': {
      return Ticket;
    }
    default: {
      return null;
    }
  }
};

const LargeButton = ({ label, onClick, disabled, icon }: LargeButtonProps) => {
  const handleClickButton = () => {
    onClick?.();
  };

  const Icon = getIcon(icon);

  return (
    <button
      className={clsx(
        'w-full text-lg h-14 rounded-2xl flex items-center justify-center',
        {
          'text-white bg-primary': !disabled,
          'text-gray-400 bg-gray-100': disabled,
        }
      )}
      onClick={handleClickButton}
      disabled={disabled}
    >
      <div className="flex items-center justify-center gap-1">
        <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
          {icon && <Icon className="fill-current" />}
        </div>
        <p>{label}</p>
      </div>
    </button>
  );
};

export default LargeButton;
