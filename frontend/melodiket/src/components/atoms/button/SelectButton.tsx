import { clsx } from 'clsx';
import ArrowButton from './ArrowButton';

interface SelectButtonProps {
  options: string[];
  isSelected?: boolean;
}

const SelectButton = ({ options, isSelected = false }: SelectButtonProps) => {
  return (
    <div className="relative inline-block">
      <select
        className={clsx(
          'px-4 py-2 rounded-full text-sm appearance-none pr-10',
          isSelected
            ? 'text-purple-400 bg-purple-50'
            : 'text-gray-400 bg-gray-100'
        )}
      >
        <option disabled value="">
          선택
        </option>
        {options?.map((option, index) => <option key={index}>{option}</option>)}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <ArrowButton
          direction="down"
          color={isSelected ? 'text-purple-400' : 'text-gray-400'}
        />
      </div>
    </div>
  );
};

export default SelectButton;
