'use client';

import Checkbox from '@/components/atoms/checkbox/Checkbox';

interface AllCheckboxProps {
  label?: string;
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
}

const AllCheckbox = ({ label, isChecked, onChange }: AllCheckboxProps) => {
  const handleClick = () => {
    onChange?.(!isChecked);
  };

  return (
    <div className="w-full flex items-center gap-2">
      <Checkbox rounded isChecked={isChecked} onChange={onChange} />
      <p
        onClick={handleClick}
        className="flex-grow text-lg font-semibold cursor-pointer"
      >
        {label}
      </p>
    </div>
  );
};

export default AllCheckbox;
