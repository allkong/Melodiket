import { WarningCircle } from '@/public/icons';
import clsx from 'clsx';

interface WarningProps {
  type: 'info' | 'warning' | 'error';
}

const Warning = ({ type }: WarningProps) => {
  return (
    <WarningCircle
      className={clsx('flex-shrink-0', {
        'text-[#3347FF]': type === 'info',
        'text-[#FFD233]': type === 'warning',
        'text-[#FF3333]': type === 'error',
      })}
    />
  );
};

export default Warning;
