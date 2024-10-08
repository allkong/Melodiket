import OptionButton from '@/components/atoms/button/OptionButton';
import Checkbox from '@/components/atoms/checkbox/Checkbox';

interface StageItemProps {
  title: string;
  content?: string;
  isSelected?: boolean;
  onClick?: () => void;
  isModify?: boolean;
}

const StageItem = ({
  title,
  content,
  isSelected,
  onClick,
  isModify,
}: StageItemProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full px-5 py-3 flex items-center justify-between cursor-pointer"
    >
      <div>
        <p className="text-black font-semibold">{title}</p>
        {content && <p className="text-gray-300">{content}</p>}
      </div>
      <div className="flex items-center gap-2">
        {isSelected && <Checkbox isChecked={true} rounded={false} />}
        {isModify && (
          <div className="flex gap-2">
            <OptionButton label="수정" isSelected={true} />
            <OptionButton label="삭제" isSelected={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StageItem;
