import Checkbox from '@/components/atoms/checkbox/Checkbox';

interface LabelCheckboxProps {
  label?: string;
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
  onClickMoreButton?: () => void;
}

const LabelCheckbox = ({
  label,
  isChecked,
  onChange,
  onClickMoreButton,
}: LabelCheckboxProps) => {
  const handleClick = () => {
    onChange?.(!isChecked);
  };

  return (
    <div className="w-full flex items-center gap-2">
      <Checkbox isChecked={isChecked} onChange={onChange} />
      <p
        onClick={handleClick}
        className="flex-grow text-sm text-gray-500 cursor-pointer"
      >
        {label}
      </p>
      <div onClick={onClickMoreButton}>{/* 더보기 버튼 */}</div>
    </div>
  );
};

export default LabelCheckbox;
