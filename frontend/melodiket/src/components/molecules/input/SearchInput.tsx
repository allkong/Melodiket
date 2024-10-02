'use client';

import ArrowButton from '@/components/atoms/button/ArrowButton';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useState,
} from 'react';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
}

const SearchInput = forwardRef(
  (
    {
      value: controlledValue,
      onChange,
      onSubmit,
      placeholder,
    }: SearchInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const router = useRouter();
    const isControlled = controlledValue !== undefined;

    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (!isControlled) {
        setValue(value);
      }
      onChange?.(value);
    };

    const handleClear = () => {
      if (!isControlled) {
        setValue('');
      }
      onChange?.('');
      onSubmit?.('');
    };

    const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;

      if (key === 'Enter') {
        onSubmit?.(isControlled ? controlledValue : value);
      }
    };

    return (
      <div className="flex items-center w-full h-[70px] px-5 py-3 gap-4">
        <ArrowButton direction="left" onClick={() => router.back()} />
        <div className="flex items-center flex-grow w-0 h-full rounded-md px-3 bg-gray-100 overflow-none">
          <input
            ref={ref}
            value={isControlled ? controlledValue : value}
            onChange={handleChange}
            onKeyDown={handlePressEnter}
            className="flex-grow text-xs font-medium outline-none bg-transparent text-gray-500"
            type="text"
            placeholder={placeholder}
          />
          <button
            onClick={handleClear}
            className="flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-gray-100 text-2xs"
          >
            X
          </button>
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
