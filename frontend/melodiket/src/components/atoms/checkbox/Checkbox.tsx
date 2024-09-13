'use client';

import clsx from 'clsx';
import { Check } from '@/public/icons';
import { ForwardedRef, forwardRef, useState } from 'react';

interface CheckboxProps {
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
  rounded?: boolean;
}

const Checkbox = forwardRef(
  (
    { isChecked: controlledIsChecked, onChange, rounded }: CheckboxProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const isControlled = controlledIsChecked !== undefined;

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
      if (!isControlled) {
        setIsChecked(!isChecked);
      }

      onChange?.(!controlledIsChecked);
    };

    const checkedState = isControlled ? controlledIsChecked : isChecked;

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
              'text-primary border-primary': checkedState,
              'text-gray-400 border-gray-400': !checkedState,
            },
            {
              'bg-purple-100': rounded && checkedState,
              'bg-white': rounded && !checkedState,
            }
          )}
        >
          <Check className="fill-current" />
        </div>
        <input ref={ref} hidden type="checkbox" checked={checkedState} />
      </>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
