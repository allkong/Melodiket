'use client';

import {
  ChangeEvent,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useState,
} from 'react';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  onClickEnter?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: Extract<
    ComponentProps<'input'>['type'],
    'text' | 'password' | 'number'
  >;
  disabled?: boolean;
}

const Input = forwardRef(
  (
    {
      value: controlledValue,
      onChange,
      onClickEnter,
      onBlur,
      placeholder,
      type = 'text',
      disabled = false,
    }: InputProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const isControlled = controlledValue !== undefined;

    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const eventValue = e.target.value;

      if (type === 'number' && isNaN(Number(eventValue)) && eventValue !== '') {
        return;
      }

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
      <input
        ref={ref}
        className="w-full h-12 px-5 text-base border outline-none rounded-2xl placeholder:text-gray-200"
        type={type}
        placeholder={placeholder}
        value={isControlled ? controlledValue : value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        disabled={disabled}
        inputMode={type === 'number' ? 'numeric' : undefined} // 모바일 키패드에 숫자 패드 표시
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
