import Checkbox from '@/components/atoms/checkbox/Checkbox';

interface StageItemProps {
  title: string;
  content?: string;
  isSelected: boolean;
  onClick: () => void;
}

const StageItem = ({ title, content, isSelected, onClick }: StageItemProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full px-5 py-3 flex items-center justify-between cursor-pointer"
    >
      <div>
        <p className="text-black font-semibold">{title}</p>
        {content && <p className="text-gray-300">{content}</p>}
      </div>
      {isSelected && <Checkbox isChecked={true} rounded={false} />}
    </div>
  );
};

export default StageItem;
