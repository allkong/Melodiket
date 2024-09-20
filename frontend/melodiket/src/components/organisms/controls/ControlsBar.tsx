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

  const sortQuery = searchParams.get('sort') || 'alphabetical';
  const filterQuery = searchParams.get('filter') === 'true';
  const selectOptions = Object.entries(SELECT_OPTIONS).map(([key, value]) => ({
    value: key,
    label: value,
  }));

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
      {Object.keys(SORT_OPTIONS).map((option) => (
        <OptionButton
          key={option}
          label={SORT_OPTIONS[option as keyof typeof SORT_OPTIONS]}
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
        selectedOption={
          selectOptions.some((option) => option.value === sortQuery)
            ? sortQuery
            : null
        }
        isSelected={selectOptions.some((option) => option.value === sortQuery)}
        onSelect={handleOptionSelect}
      />
    </div>
  );
};

export default ControlsBar;
