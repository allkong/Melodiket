import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface SignUpRoleRadioProps {
  title?: string;
  description?: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  value: string;
}

const SignUpRoleRadio = ({
  title,
  description,
  name,
  checked,
  onChange,
  disabled,
  value,
}: SignUpRoleRadioProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange?.(value);
  };

  return (
    <label
      className={clsx(
        'w-full min-w-80 h-fit min-h-24 flex flex-col justify-center gap-1 px-5 py-6 rounded-3xl cursor-pointer',
        {
          'bg-purple-100 ': checked,
          'bg-gray-100 ': !checked,
        }
      )}
    >
      <p
        className={clsx('text-xl', {
          'text-purple-400': checked,
        })}
      >
        {title}
      </p>
      <p
        className={clsx('text-sm', {
          'text-purple-200': checked,
          'text-gray-500': !checked,
        })}
      >
        {description}
      </p>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        value={value}
        hidden
      />
    </label>
  );
};

export default SignUpRoleRadio;
