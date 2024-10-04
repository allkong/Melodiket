'use client';

import CloseButton from '@/components/atoms/button/CloseButton';
import { Clock } from '@/public/icons';

interface RecentSearchItemProps {
  label: string;
  onClick: () => void;
  onClickDelete: () => void;
}

const RecentSearchItem = ({
  label,
  onClick,
  onClickDelete,
}: RecentSearchItemProps) => {
  return (
    <div className="flex items-center justify-between w-full h-9 px-5 py-1">
      <label className="flex items-center gap-3 text-gray-500">
        <Clock className="fill-current" />
        <button onClick={onClick}>{label}</button>
      </label>
      <CloseButton onClick={() => onClickDelete()} />
    </div>
  );
};

export default RecentSearchItem;
