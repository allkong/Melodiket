import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface LoginRoleRadio {
  mainLabel?: string;
  subLabel?: string;
  group?: string;
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
}

const LoginRoleRadio = ({
  mainLabel,
  subLabel,
  group,
  isChecked,
  onChange,
}: LoginRoleRadio) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onChange?.(checked);
  };

  const onClick = () => {
    onChange?.(!isChecked);
  };

  return (
    <div
      className={clsx(
        'w-full min-w-80 h-fit min-h-24 flex flex-col justify-center gap-1 px-5 py-6 rounded-3xl cursor-pointer',
        {
          'bg-purple-100 ': isChecked,
          'bg-gray-100 ': !isChecked,
        }
      )}
      onClick={onClick}
    >
      <p
        className={clsx('text-xl', {
          'text-purple-400': isChecked,
        })}
      >
        {mainLabel}
      </p>
      <p
        className={clsx('text-sm', {
          'text-purple-200': isChecked,
          'text-gray-500': !isChecked,
        })}
      >
        {subLabel}
      </p>
      <input
        type="radio"
        checked={isChecked}
        onChange={handleChange}
        name={group}
        hidden
      />
    </div>
  );
};

export default LoginRoleRadio;
