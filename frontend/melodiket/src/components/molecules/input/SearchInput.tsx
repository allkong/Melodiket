'use client';

import ArrowButton from '@/components/atoms/button/ArrowButton';
import { useRouter } from 'next/navigation';
import { ForwardedRef, forwardRef, KeyboardEvent } from 'react';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onCloseClick?: () => void;
  placeholder?: string;
}

const SearchInput = forwardRef(
  (
    { value, onChange, onKeyDown, onCloseClick, placeholder }: SearchInputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const router = useRouter();

    return (
      <div className="flex items-center w-full h-[70px] px-5 py-3 gap-4">
        <ArrowButton direction="left" onClick={() => router.back()} />
        <div className="flex items-center flex-grow w-0 h-full rounded-md px-3 bg-gray-100 overflow-none">
          <input
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={(e) => onKeyDown?.(e)}
            className="flex-grow text-xs font-medium outline-none bg-transparent text-gray-500"
            type="text"
            placeholder={placeholder}
          />
          <button
            onClick={onCloseClick}
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
