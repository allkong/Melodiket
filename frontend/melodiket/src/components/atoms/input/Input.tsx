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
  placeholder?: string;
  type?: Extract<ComponentProps<'input'>['type'], 'text' | 'password'>;
}

const Input = forwardRef(
  (
    {
      value: controlledValue,
      onChange,
      onClickEnter,
      placeholder,
      type,
    }: InputProps,
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
      <input
        ref={ref}
        className="w-full h-12 px-5 text-base border outline-none rounded-2xl"
        type={type}
        placeholder={placeholder}
        value={isControlled ? controlledValue : value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
