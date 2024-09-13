import { useState } from 'react';

import OptionButton from '@/components/atoms/button/OptionButton';
import SelectButton from '@/components/atoms/button/SelectButton';

const ControlsBar = () => {
  const [sortOption, setSortOption] = useState<string | null>('가나다순');
  const [isFilter, setIsFilter] = useState(false);

  const handleOptionClick = (option: string) => {
    setSortOption(option);
  };

  const handleFilterClick = () => {
    setIsFilter((prev) => !prev);
  };

  return (
    <div className="flex flex-row gap-3 px-6 py-3 bg-white">
      <OptionButton
        label="가나다순"
        isSelected={sortOption === '가나다순'}
        onClick={() => handleOptionClick('가나다순')}
      />
      <OptionButton
        label="인기순"
        isSelected={sortOption === '인기순'}
        onClick={() => handleOptionClick('인기순')}
      />
      <OptionButton
        label="예매 중"
        isSelected={isFilter}
        onClick={handleFilterClick}
      />
      <SelectButton options={['등록순', '최신순']} />
    </div>
  );
};

export default ControlsBar;
