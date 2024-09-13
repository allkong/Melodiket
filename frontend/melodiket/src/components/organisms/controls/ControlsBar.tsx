'use client';

import { useState } from 'react';

import OptionButton from '@/components/atoms/button/OptionButton';
import SelectButton from '@/components/atoms/button/SelectButton';

const ControlsBar = () => {
  const [sortOption, setSortOption] = useState<string | null>('가나다순');
  const [isFilter, setIsFilter] = useState(false);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState<
    string | null
  >(null);

  const handleOptionSelect = (option: string) => {
    setSortOption(option);
    setSelectedDropdownOption(null);
  };

  const handleFilterClick = () => {
    setIsFilter((prev) => !prev);
  };

  const handleSelectChange = (option: string) => {
    setSortOption(option);
    setSelectedDropdownOption(option);
  };

  return (
    <div className="flex flex-row gap-3 px-6 py-3 bg-white">
      <OptionButton
        label="가나다순"
        isSelected={sortOption === '가나다순'}
        onClick={() => handleOptionSelect('가나다순')}
      />
      <OptionButton
        label="인기순"
        isSelected={sortOption === '인기순'}
        onClick={() => handleOptionSelect('인기순')}
      />
      <OptionButton
        label="예매 중"
        isSelected={isFilter}
        onClick={handleFilterClick}
      />
      <SelectButton
        options={['등록순', '최신순']}
        selectedOption={selectedDropdownOption}
        isSelected={sortOption === '등록순' || sortOption === '최신순'}
        onSelect={handleSelectChange}
      />
    </div>
  );
};

export default ControlsBar;
