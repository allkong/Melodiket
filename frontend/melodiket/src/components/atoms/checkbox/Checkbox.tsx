'use client';

import clsx from 'clsx';
import { Check } from '@/public/icons';

interface CheckboxProps {
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
  rounded?: boolean;
}

const Checkbox = ({ isChecked, onChange, rounded }: CheckboxProps) => {
  const handleChange = () => {
    onChange?.(!isChecked);
  };

  return (
    <>
      <div
        onClick={handleChange}
        className={clsx(
          'cursor-pointer flex items-center justify-center',
          {
            'w-6 h-6 rounded-full border': rounded,
            'w-fit h-fit': !rounded,
          },
          {
            'text-primary border-primary': isChecked,
            'text-gray-400 border-gray-400': !isChecked,
          },
          {
            'bg-purple-100': rounded && isChecked,
            'bg-white': rounded && !isChecked,
          }
        )}
      >
        <Check className="fill-current" />
      </div>
      <input hidden type="checkbox" checked={isChecked} />
    </>
  );
};

export default Checkbox;
