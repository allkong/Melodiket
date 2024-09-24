'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useState,
} from 'react';

interface DateInputProps {
  onChange?: (value: string) => void;
  onClickEnter?: () => void;
  onBlur?: () => void;
  placeholder?: string;
}

const DateInput = forwardRef(
  (
    { onChange, onBlur, placeholder }: DateInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (onChange) {
        onChange(newValue);
      }
    };

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className="w-full h-12 pl-5 pr-10 text-base border outline-none rounded-2xl placeholder:text-gray-200"
          type="date"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <div
          className="absolute right-9 bg-white top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
          style={{
            width: '24px',
            height: '24px',
            background: "url('/icons/calendar.svg') no-repeat center",
            backgroundSize: '24px',
            backgroundColor: 'white',
          }}
        />
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';

export default DateInput;
