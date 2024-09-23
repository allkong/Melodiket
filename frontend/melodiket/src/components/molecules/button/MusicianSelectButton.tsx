import clsx from 'clsx';
import Checkbox from '@/components/atoms/checkbox/Checkbox';

interface MusicianSelectButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const MusicianSelectButton = ({
  label,
  isSelected = false,
  onClick,
}: MusicianSelectButtonProps) => {
  return (
    <div
      className={clsx(
        'w-full px-5 py-3 flex items-center justify-between font-medium',
        {
          'text-black': !isSelected,
          'text-purple-500': isSelected,
        }
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      <Checkbox isChecked={isSelected} rounded={true} />
    </div>
  );
};

export default MusicianSelectButton;
