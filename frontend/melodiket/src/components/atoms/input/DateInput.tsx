'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useState,
  useEffect,
} from 'react';

interface DateInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
}

const DateInput = forwardRef(
  (
    {
      value: controlledValue = '',
      onChange,
      onBlur,
      placeholder,
      minDate,
      maxDate,
    }: DateInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const [value, setValue] = useState(controlledValue);

    useEffect(() => {
      setValue(controlledValue);
    }, [controlledValue]);

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
          className="w-full h-12 pl-5 pr-10 text-base border outline-none rounded-2xl text-gray-200"
          type="date"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          min={minDate}
          max={maxDate}
        />
        <div
          className="absolute right-9 bg-white top-1/2 transform -translate-y-1/2 pointer-events-none z-10 w-6 h-6 bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/icons/calendar.svg')",
          }}
        />
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';

export default DateInput;
