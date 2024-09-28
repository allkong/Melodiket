'use client';

import clsx from 'clsx';
import { ReactElement } from 'react';

interface LargeButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactElement;
}

const LargeButton = ({ label, onClick, disabled, icon }: LargeButtonProps) => {
  const handleClickButton = () => {
    onClick?.();
  };

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
      <div className="flex items-center justify-center gap-2">
        {icon && (
          <div className="flex items-center justify-center w-6 h-6 overflow-hidden">
            {icon}
          </div>
        )}
        <p>{label}</p>
      </div>
    </button>
  );
};

export default LargeButton;
