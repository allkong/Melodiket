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
        'w-full px-5 py-3 flex items-center justify-between font-medium cursor-pointer',
        {
          'text-black': !isSelected,
        }
      )}
    >
      <span>{label}</span>
      <Checkbox isChecked={isSelected} onChange={onClick} rounded={true} />
    </div>
  );
};

export default MusicianSelectButton;
