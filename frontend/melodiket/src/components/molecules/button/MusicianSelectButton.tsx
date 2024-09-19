import clsx from 'clsx';
import Checkbox from '@/components/atoms/checkbox/Checkbox';

interface MusicianSelectButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const MusicianSelectButton = ({
  label,
  selected,
  onClick,
}: MusicianSelectButtonProps) => {
  return (
    <div
      className={clsx(
        'w-full px-5 py-3 bg-white flex items-center justify-between font-medium',
        {
          'text-black': !selected,
          'text-purple-500': selected,
        }
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      <Checkbox isChecked={selected} rounded={true} />
    </div>
  );
};

export default MusicianSelectButton;
