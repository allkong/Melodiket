import { clsx } from 'clsx';

interface SelectButtonProps {
  isSelected?: boolean;
}

const SelectButton = ({ isSelected = false }: SelectButtonProps) => {
  return (
    <select
      className={clsx(
        'px-4 py-2 rounded-full text-sm appearance-none',
        'pr-8',
        isSelected
          ? 'text-purple-400 bg-purple-50'
          : 'text-gray-400 bg-gray-100'
      )}
    >
      <option disabled selected>
        선택
      </option>
      <option>등록순</option>
      <option>최신순</option>
    </select>
  );
};

export default SelectButton;
