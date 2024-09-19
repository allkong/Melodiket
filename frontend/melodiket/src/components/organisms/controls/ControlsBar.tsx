'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  SORT_OPTIONS,
  FILTER_OPTIONS,
  SELECT_OPTIONS,
} from '@/constants/controlOptions';

import OptionButton from '@/components/atoms/button/OptionButton';
import SelectButton from '@/components/atoms/button/SelectButton';

const ControlsBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortQuery = searchParams.get('sort') || SORT_OPTIONS.alphabetical;
  const filterQuery = searchParams.get('filter') === 'true';
  const selectOptions = Object.values(SELECT_OPTIONS);

  const updateQueryParams = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleOptionSelect = (option: string) => {
    updateQueryParams('sort', option);
  };

  const handleFilterClick = () => {
    updateQueryParams('filter', !filterQuery);
  };

  return (
    <div className="flex flex-row gap-3 px-6 py-3 bg-white">
      {Object.values(SORT_OPTIONS).map((option) => (
        <OptionButton
          key={option}
          label={option}
          isSelected={sortQuery === option}
          onClick={() => handleOptionSelect(option)}
        />
      ))}
      <OptionButton
        label={FILTER_OPTIONS.booking}
        isSelected={filterQuery}
        onClick={handleFilterClick}
      />
      <SelectButton
        options={selectOptions}
        selectedOption={selectOptions.includes(sortQuery) ? sortQuery : null}
        isSelected={selectOptions.includes(sortQuery)}
        onSelect={handleOptionSelect}
      />
    </div>
  );
};

export default ControlsBar;
