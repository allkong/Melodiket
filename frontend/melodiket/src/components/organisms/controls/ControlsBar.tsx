'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { FILTER_OPTIONS, SORT_OPTIONS } from '@/constants/controlOptions';

import OptionButton from '@/components/atoms/button/OptionButton';

const ControlsBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterQuery = searchParams.get('filter') !== 'false';
  const sortQuery = searchParams.get('sort') || 'popularity';

  const updateQueryParams = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterClick = () => {
    updateQueryParams('filter', !filterQuery);
  };

  const handleOptionClick = (option: string) => {
    updateQueryParams('sort', option);
  };

  return (
    <div className="flex flex-row gap-3 px-6 py-3 bg-white overflow-x-auto whitespace-nowrap scrollbar-hide">
      <OptionButton
        label={FILTER_OPTIONS.booking}
        isSelected={filterQuery}
        onClick={handleFilterClick}
      />
      {Object.keys(SORT_OPTIONS).map((option) => (
        <OptionButton
          key={option}
          label={SORT_OPTIONS[option as keyof typeof SORT_OPTIONS]}
          isSelected={sortQuery === option}
          onClick={() => handleOptionClick(option)}
        />
      ))}
    </div>
  );
};

export default ControlsBar;
