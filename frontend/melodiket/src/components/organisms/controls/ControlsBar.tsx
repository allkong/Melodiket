'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { FILTER_OPTIONS, SORT_OPTIONS } from '@/constants/controlOptions';

import OptionButton from '@/components/atoms/button/OptionButton';
import SelectButton from '@/components/atoms/button/SelectButton';

const ControlsBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterQuery = searchParams.get('filter') !== 'false';
  const sortQuery = searchParams.get('sort') || 'popularity';
  const sortOptions = Object.entries(SORT_OPTIONS).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const updateQueryParams = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterClick = () => {
    updateQueryParams('filter', !filterQuery);
  };

  const handleOptionSelect = (option: string) => {
    updateQueryParams('sort', option);
  };

  return (
    <div className="flex flex-row gap-3 px-6 py-3 bg-white overflow-x-auto whitespace-nowrap scrollbar-hide justify-end">
      <OptionButton
        label={FILTER_OPTIONS.booking}
        isSelected={filterQuery}
        onClick={handleFilterClick}
      />
      <SelectButton
        options={sortOptions}
        selectedOption={
          sortOptions.some((option) => option.value === sortQuery)
            ? sortQuery
            : null
        }
        isSelected={sortOptions.some((option) => option.value === sortQuery)}
        onSelect={handleOptionSelect}
      />
    </div>
  );
};

export default ControlsBar;
