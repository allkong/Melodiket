import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface SeatRaioProps {
  name?: string;
  checked?: boolean;
  onChange?: (row: number, col: number) => void;
  disabled?: boolean;
  row: number;
  col: number;
}

const SeatRadio = ({
  checked,
  name,
  onChange,
  disabled,
  row,
  col,
}: SeatRaioProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { row, col } = JSON.parse(value);

    onChange?.(row, col);
  };

  return (
    <label
      className={clsx('w-[10px] h-[10px] flex-shrink-0', {
        'bg-primary cursor-pointer': !disabled,
        'bg-gray-400': disabled,
        'border-2 border-purple-400': checked,
      })}
    >
      <input
        type="radio"
        name={name}
        value={JSON.stringify({ row, col })}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        hidden
      />
    </label>
  );
};

export default SeatRadio;
