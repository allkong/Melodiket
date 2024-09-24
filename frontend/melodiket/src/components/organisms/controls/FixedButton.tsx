import { ReactElement } from 'react';

import LargeButton from '@/components/atoms/button/LargeButton';

interface LargeButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactElement;
}

const FixedButton = ({ label, onClick, disabled, icon }: LargeButtonProps) => {
  return (
    <div className="fixed bottom-0 flex items-center justify-center w-full max-w-xl py-5 bg-white px-7">
      <LargeButton
        label={label}
        onClick={onClick}
        disabled={disabled}
        icon={icon}
      />
    </div>
  );
};

export default FixedButton;
