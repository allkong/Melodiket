'use client';

import {
  ChangeEvent,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useState,
} from 'react';

interface DateInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onClickEnter?: () => void;
  onBlur?: () => void;
  placeholder?: string;
}

const DateInput = forwardRef(
  (
    {
      value: controlledValue,
      onChange,
      onClickEnter,
      onBlur,
      placeholder,
    }: DateInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const isControlled = controlledValue !== undefined;

    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const eventValue = e.target.value;
      if (!isControlled) {
        setValue(eventValue);
      }

      onChange?.(eventValue);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onClickEnter?.();
      }
    };

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className="w-full h-12 pl-5 pr-10 text-base border outline-none rounded-2xl placeholder:text-gray-200"
          type="date"
          placeholder={placeholder}
          value={isControlled ? controlledValue : value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          // appearance 제거를 위해 모든 브라우저에 대해 적용
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            position: 'relative',
          }}
        />
        <div
          className="absolute right-9 bg-white top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
          style={{
            width: '24px',
            height: '24px',
            background: "url('/icons/calendar.svg') no-repeat center",
            backgroundSize: '24px',
          }}
        />
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';

export default DateInput;
