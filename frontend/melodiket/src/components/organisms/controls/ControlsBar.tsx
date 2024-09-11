import OptionButton from '@/components/atoms/button/OptionButton';

const ControlsBar = () => {
  return (
    <div className="flex flex-row gap-3 px-6 py-3">
      <OptionButton label="가나다순" />
      <OptionButton label="인기순" />
      <OptionButton label="예매 중" />
    </div>
  );
};

export default ControlsBar;
