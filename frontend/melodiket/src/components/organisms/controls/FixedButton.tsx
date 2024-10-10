import LargeButton from '@/components/atoms/button/LargeButton';

interface FixedButtonProps {
  href?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactElement;
}

const FixedButton = ({
  href,
  label,
  onClick,
  disabled,
  icon,
}: FixedButtonProps) => {
  return (
    <div className="fixed bottom-0 flex items-center justify-center w-full max-w-xl py-5 bg-white px-7 h-fit">
      <LargeButton
        href={href}
        label={label}
        onClick={onClick}
        disabled={disabled}
        icon={icon}
      />
    </div>
  );
};

export default FixedButton;
