import { useState } from 'react';
import Checkbox from '@/components/atoms/checkbox/Checkbox';

interface StageItemProps {
  title: string;
  content?: string;
}

const StageItem = ({ title, content }: StageItemProps) => {
  const [isCheckedVisible, setIsCheckedVisible] = useState(false);

  const handleClick = () => {
    setIsCheckedVisible((prev) => !prev);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full px-5 py-3 bg-white flex items-center justify-between"
    >
      <div>
        <p className="text-black font-semibold">{title}</p>
        {content && <p className="text-gray-300">{content}</p>}
      </div>
      {isCheckedVisible && <Checkbox isChecked={false} rounded={false} />}
    </div>
  );
};

export default StageItem;
